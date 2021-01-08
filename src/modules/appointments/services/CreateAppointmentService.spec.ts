import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let createAppointment: CreateAppointmentService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '312313e12',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('312313e12');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2021, 4, 10, 11);

    const appointment = await createAppointment.execute({
      date: appointmentDate,
      provider_id: '312313e12',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '312313e12',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
