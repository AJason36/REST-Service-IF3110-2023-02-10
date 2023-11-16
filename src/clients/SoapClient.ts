import SoapUtils from '../utils/SoapUtils';

class SoapClient {
    private caller : SoapUtils = new SoapUtils('request');

    public async getRequestOf(requestee : string) {
        const response = await this.caller.call('GetRequestsOf', {requestee});
        console.log(`GetRequestOf: ${requestee} - ${response?.code}`);
        return response;
    }

    public async approveRequest(requestBy : string, to : string) {
        const response = await this.caller.call('ApproveRequest', {requestBy, to});
        console.log(`ApproveRequest: ${requestBy}, ${to} - ${response?.code}`)
        return response;
    }

    public async rejectRequest(requestBy : string, to : string) {
        const response = await this.caller.call('RejectRequest', {requestBy, to});
        console.log(`RejectRequest: ${requestBy}, ${to} - ${response?.code}`)
        return response;
    }
}

export default new SoapClient();