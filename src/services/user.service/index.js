import { UsersService } from './user.services.js';
import { userList } from '../../repositories/user.repository/index.js';

const usersService = new UsersService(userList);

export default usersService;