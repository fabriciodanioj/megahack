import * as Yup from 'yup';
import Address from '../models/Address';

class AddressController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        number: Yup.number().required(),
        street: Yup.string().required(),
        complement: Yup.string(),
        state: Yup.string().required(),
        city: Yup.string().required(),
        zipcode: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).send({ error: 'Validation fails' });
      }

      const address = await Address.create({
        user_id: req.userId,
        ...req.body,
      });

      return res.status(200).send(address);
    } catch (err) {
      return res.status(400).send({
        msg: 'Error to create a new address',
      });
    }
  }
}

export default new AddressController();
