const express = require("express");
const router = express.Router();

const GalleryItem = require("../models/galleryItem");

// Getting All
router.get("/", async (req, res) => {
    try {
        const gallery = await GalleryItem.find();
        res.json(gallery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Getting One
router.get("/:id", getGalleryItem, (req, res) => {
    res.send(res.galleryItem);
});

// Creating One
router.post("/", async (req, res) => {
    console.log(res, req);
    const galleryItem = new GalleryItem({
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        imageLocation: req.body.imageLocation,
    });

    try {
        const newGalleryItem = await galleryItem.save();
        res.status(201).json(newGalleryItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Updating One
router.patch("/:id", getGalleryItem, async (req, res) => {
    if (req.body.title != null) {
        res.galleryItem.title = req.body.title;
    }
    if (req.body.category != null) {
        res.galleryItem.category = req.body.category;
    }
    if (req.body.description != null) {
        res.galleryItem.description = req.body.description;
    }
    if (req.body.imageLocation != null) {
        res.galleryItem.imageLocation = req.body.imageLocation;
    }
    try {
        const updatedGalleryItem = await res.galleryItem.save();
        res.json(updatedGalleryItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Deleting One
router.delete("/:id", getGalleryItem, async (req, res) => {
    try {
        await res.galleryItem.remove();
        res.json({ message: "Deleted gallery item" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getGalleryItem(req, res, next) {
    try {
        galleryItem = await GalleryItem.findById(req.params.id);
        if (galleryItem == null) {
            return res
                .status(404)
                .json({ message: "cannot find gallery item" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.galleryItem = galleryItem;
    next();
}

module.exports = router;
