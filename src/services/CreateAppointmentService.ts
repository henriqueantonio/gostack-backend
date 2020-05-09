import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointment';
import AppError from '../errors/AppError';

interface Request {
  provider_id: string;
  date: Date;
}

export default class CreateAppointmentServer {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentsInSameDate = appointmentsRepository.findBydate(
      appointmentDate,
    );

    if (!findAppointmentsInSameDate) {
      throw new AppError('This appoinments is already booked');
    }

    const appoinments = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appoinments);

    return appoinments;
  }
}
