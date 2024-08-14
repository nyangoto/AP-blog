const axios = require('axios');
const Post = require('../models/Post');

async function syncLinkedInPosts(accessToken, userId) {
  try {
    const response = await axios.get('https://api.linkedin.com/v2/ugcPosts', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    for (const post of response.data.elements) {
      await Post.findOneAndUpdate(
        { linkedInId: post.id },
        {
          title: post.specificContent['com.linkedin.ugc.ShareContent'].shareCommentary.text,
          content: post.specificContent['com.linkedin.ugc.ShareContent'].shareCommentary.text,
          author: userId,
          linkedInId: post.id,
        },
        { upsert: true, new: true }
      );
    }
  } catch (error) {
    console.error('Error syncing LinkedIn posts:', error);
  }
}

module.exports = { syncLinkedInPosts };
