const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  company: {
    type: String
  },
  title: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  headline: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  relocation: {
    type: Boolean,
    default: false
  },
  visible: {
    type: Boolean,
    default: false
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      start: {
        type: Date,
        required: true
      },
      end: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldOfStudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  certifications: [
    {
      certificateName: {
        type: String,
        required: true
      },
      issuer: {
        type: String,
        required: true
      },
      issued: {
        type: Date,
        required: true
      },
      description: {
        type: String
      }
    }
  ],
  resumes: [
    {
      resumeName: {
        type: String,
        required: true
      },
      storageName: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      },
      created: {
        type: Date,
        default: Date.now
      },
      updated: {
        type: Date,
        default: Date.now
      }
    }
  ],
  coverLetters: [
    {
      title: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      }
    }
  ],
  associations: [
    {
      associationName: {
        type: String,
        required: true
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    website: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
