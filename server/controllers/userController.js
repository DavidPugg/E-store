const User = require("../models/userModel");
module.exports = {
  register: async (req, res, next) => {
        try {
      const { username, password, email } = req.body;
      const user = new User({ username, email });
      const registeredUser = await User.register(user, password);
        req.login(registeredUser, (err) => {
        if (err) return next(err);
        res.json(req.user)
      })
    } catch (err) {
      if (err.code === 11000) {
        next({message: 'Email already in use!'})
      }
      next(err);
    }
  },
  updateUserInfo: async(req,res,next) => {
    try{
      if (req.user) {
        const id = req.user._id;
        const newInfo = req.body
        await User.findByIdAndUpdate(id, { info:  newInfo }, { runValidators: true });
      }
    } catch (err) {
      next(err)
    }
  }
};
