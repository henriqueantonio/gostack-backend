import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import IAppoinmentRepository from '../repositories/IAppointmentsRepository';

import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';

interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
export default class CreateAppointmentServer {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppoinmentRepository,
  ) {}

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentsInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (!findAppointmentsInSameDate) {
      throw new AppError('This appoinments is already booked');
    }

    const appoinments = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appoinments;
  }
}
