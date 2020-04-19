import {Router} from 'express';
import {getCustomRepository} from 'typeorm';
import {parseISO} from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', async (request, response) => {
  console.log(request.user);

  const appointmentsRepository= getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const {provider_id, date}= request.body;

    const parsedDate= parseISO(date);

    const createAppointment = new CreateAppointmentService();
    const appointment = await createAppointment.execute({provider_id, date: parsedDate});

    return response.json(appointment);
  } catch (error) {
    return response.status(error.statusCode).json({error: error.message});
  }

});

export default appointmentsRouter;
