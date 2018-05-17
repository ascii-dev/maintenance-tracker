import data from '../dummyData/index';

const { requests } = data;

class RequestController {
  // Get all requests from data
  static getAllRequests(req, res) {
    return res.status(200).json({
      allRequests: requests,
      message: 'All requests by user',
    });
  }

  // Get single request from data
  static getSingleRequest(req, res) {
    const foundRequest = requests.find(request => request.id === parseInt(req.params.id, 10));
    if (foundRequest) {
      return res.status(200).json({
        request: foundRequest,
        message: 'Single request by user',
      });
    }
    return res.status(404).json({
      message: 'Request not found!',
    });
  }
}

export default RequestController;
