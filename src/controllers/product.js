exports.getALlProducts = (req, res) => {
    res.status(200).json({
        message: "contoh /products",
        data: [
            {
                id: 1,
                name: "product 1",
                price: 10000,
                quantity: 10,
                photo:
                    "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
            },
            {
                id: 2,
                name: "product 2",
                price: 10000,
                quantity: 10,
                photo:
                    "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
            },
        ],
    });
};


exports.addProducts = (req, res) => {
    let { name, price, quantity, photo } = req.body
    if (!name) {
        return res.status(400).json({
            status: "failed",
            message: "name is required"
        })
    }
    if (!price) {
        return res.status(400).json({
            status: "failed",
            message: "price is required"
        })
    }
    if (!quantity) {
        return res.status(400).json({
            status: "failed",
            message: "quantity is required"
        })
    }
    if (!photo) {
        return res.status(400).json({
            status: "failed",
            message: "photo is required"
        })
    }

    return res.status(200).json({
        status: "success",
        message: "product added successfully",
        data: {
            name,
            price,
            quantity,
            photo
        }
    })
}