const root = 'frontend/views';

class FrontendController {
  static index(req, res) {
    res.sendFile('index.html', { root });
  }
}

export default FrontendController;
