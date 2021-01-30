import dbClient from '../utils/db';

const { ObjectId } = require('mongodb');

class UsersController {
  static async postNew(request, response) {
    const { email, password } = request.body;

    if (!email) return response.status(400).send({ error: 'Missing email' });
    if (!password) return response.status(400).send({ error: 'Missing password' });

    const eExists = await dbClient.usersCollection.findOne({ email });
    if (eExists) return response.status(400).send({ error: 'Already exist' });
  }

//   static async getMe(request, response) {    
//   }
}

export default UsersController;
