const advancedResults = (Model, populate) => async (req, res, next) => {
    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over remove fields and delete then from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);
    
    // Create query string
    let queryStr = JSON.stringify(reqQuery);
    
    // Create operators ($gt, gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource
    let query = Model.find(JSON.parse(queryStr));

    // Select Fields
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    // Sort 
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else query = query.sort('-created_at');
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Model.countDocuments();
    
    query = query.skip(startIndex).limit(limit);
    
    if (populate) {
        query = query.populate(populate);
    }
    
    // Execute query
    const results = await query;
    
    // Pagination result
    const pagination = { limit };
    if (total / limit > 1) pagination.countPages = Math.ceil(total / limit);
    if (startIndex > 0) pagination.prev = { page: page - 1 }
    if (endIndex < total) pagination.next = { page: page + 1 }

    res.advancedResults = {
        success: true,
        count: results.length,
        pagination,
        data: results
    };

    next();
}

module.exports = advancedResults;