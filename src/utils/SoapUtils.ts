import axios from 'axios'
import converter from 'xml-js'
import dotenv from 'dotenv'

type Header = {
    [key: string]: string | number | boolean;
}

class SoapUtils {
    private url : string = '';

    constructor (service : String) {
        dotenv.config();
        this.url = process.env.SOAP_SERVICE_URL || '';
        this.url += `${service}`;
    }

    public async call (method : string, args? : Object) {
        if (!this.url) {
            throw new Error('SOAP_SERVICE_URL is not defined');
        }

        const headers: Header = {
            'Content-Type': 'text/xml;charset=UTF-8',
            'SOAPAction': '"http://ws.soap.com/' + method + '"',
        }

        const xml = this.buildXml(method, args);

        try {
            const response = await axios.post(this.url, xml, { headers });
            const json = converter.xml2json(response.data, {compact: true, spaces: 4});
    
            const result = JSON.parse(json);
            const ret = result['S:Envelope']['S:Body'][`ns2:${method}Response`];
            return this.prettifyParsedObj(ret);
        } catch (error : any) {
            console.error('Error calling SOAP service: ' + error);
            if (error.response) {
                console.error(error.response.data);
                console.error(error.response.status);
                console.error(error.response.headers);
            }
        }
    }

    private prettifyParsedObj ( obj : any ) {

        if (obj.return) {
            // object return an array
            const data = obj.return.data.item;
            const length = data ? (Array.isArray(data) ? data.length : 1) : 0;
            const res = {
                code : parseInt(obj.return.code._text),
                message : obj.return.message._text,
                length : length,
                data : obj.return.data.item
            }
            return res;
        }

        // else, object return a single object
        const data = obj.Response.data;
        const res = {
            code : parseInt(obj.Response.code._text),
            message : obj.Response.message._text,
            data : data
        }

        return res;
    }

    private buildXml (method : string, args? : Object) {
        const params = this.buildXmlParams(args);

        return `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Header>
            <ApiKey xmlns="http://ws.soap.com/">${process.env.SOAP_SERVICE_API_TOKEN}</ApiKey>
        </Header>
        <Body>
            <${method} xmlns="http://ws.soap.com/">
                ${params}
            </${method}>
        </Body>
    </Envelope>`;
    }

    private buildXmlParams (args? : Object) {
        if (!args) {
            return ''
        }

        const params : String[] = Object.keys(args).map((key) => {
            // capitalize first letter
            const newKey = key.charAt(0).toUpperCase() + key.slice(1);

            return `<${newKey} xmlns="">${args[key as keyof typeof args]}</${newKey}>\n`
        });

        params[params.length - 1] = params[params.length - 1].slice(0, -1); // remove last \n
        return params.join('');
    }
}

export default SoapUtils;