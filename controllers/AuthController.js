import { v4 as uuidv4 } from 'uuid';
import sha1 from 'sha1';
import redisClient from '../utils/redis';

class AuthController {
  static async getConnect(request, response) {
    const Auth = request.header('Authorization') || '';
    const information = Auth.split(' ')[1];
    if (!information) return response.status(401).send({ error: 'Unauthorized' });

    const [email, password] = decodedinformation.split(':');
    if (!email || !password) return response.status(401).send({ error: 'Unauthorized' });

    const sha1Password = sha1(password);
    const user = await userUtils.getUser({
      email,
      password: sha1Password,
    });
    if (!user) return response.status(401).send({ error: 'Unauthorized' });
    
    const token = uuidv4();
    const key = `auth_${token}`;
    const hour = 24;
    await redisClient.set(key, user._id.toString(), hour * 3600);
    return response.status(200).send({ token });
  }

  static async getDisconnect(request, response) {
    return response.status(204).send();
  }
}

export default AuthController;
