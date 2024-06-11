const customResponse = {
  success: (res, data, message = "Success") => {
    res.status(200).json({
      status: 200,
      result: true,
      message: message,
      data: data || null
    });
  },
  created: (res, data, message = "Created") => {
    res.status(201).json({
      status: 201,
      result: true,
      message: message,
      data: data || null
    });
  },
  notFound: (res, error, message = "Not Found") => {
    res.status(404).json({
      status: 404,
      result: false,
      message: message,
      data: null
    });
  },
  badRequest: (res, err, message = "Bad Request") => {
    res.status(400).json({
      status: 400,
      result: false,
      message: message,
      error: error
    });
  },
  exception: (res, error) => {
    res.status(500).json({
      status: 500,
      result: false,
      error: error || "Internal Server Error",
      message: error.message || "Unknown Error"
    });
  }
};

export default customResponse;
