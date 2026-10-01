const User = require('../models/User');
const Activity = require('../models/Activity');

/**
 * @desc    Get portfolio by ID
 * @route   GET /api/portfolio/:portfolioId
 * @access  Public
 */
exports.getPortfolio = async (req, res, next) => {
  try {
    const user = await User.findOne({ portfolioId: req.params.portfolioId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found',
      });
    }

    if (!user.isPublic) {
      return res.status(403).json({
        success: false,
        message: 'This portfolio is private',
      });
    }

    // Get user's approved activities
    const activities = await Activity.find({
      studentId: user._id,
      status: 'approved',
    }).sort({ date: -1 });

    // Get user's projects
    const Project = require('../models/Project');
    const projects = await Project.find({
      createdBy: user._id,
      isPublished: true,
    }).sort({ createdAt: -1 });

    const portfolioData = {
      user: {
        name: user.name,
        email: user.email,
        bio: user.bio,
        points: user.points,
        skills: user.skills,
        socialLinks: user.socialLinks,
      },
      activities,
      projects,
    };

    res.status(200).json({
      success: true,
      data: portfolioData,
    });
  } catch (error) {
    next(error);
  }
};
