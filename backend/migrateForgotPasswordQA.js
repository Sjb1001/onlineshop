const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');

async function migrateForgotPasswordQA() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const users = await User.find();
    let updatedCount = 0;

    for (const user of users) {
      const raw = user.toObject ? user.toObject() : user;

      const questionValue = raw.securityQuestion || raw.securityquestion || raw.security_question || '';
      const answerValue = raw.securityAnswer || raw.securityanswer || raw.security_answer || '';

      const normalizedQuestion = questionValue ? String(questionValue).trim() : '';
      const normalizedAnswer = answerValue ? String(answerValue).trim().toLowerCase() : '';

      const updates = {};

      if (normalizedQuestion && normalizedQuestion !== user.securityQuestion) {
        updates.securityQuestion = normalizedQuestion;
      }

      if (normalizedAnswer && normalizedAnswer !== user.securityAnswer) {
        updates.securityAnswer = normalizedAnswer;
      }

      if (Object.keys(updates).length > 0) {
        await User.updateOne({ _id: user._id }, { $set: updates });
        console.log(`Updated user ${user.email || user._id}:`, updates);
        updatedCount += 1;
      }
    }

    console.log(`✅ Migration complete. ${updatedCount} user(s) updated.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateForgotPasswordQA();
