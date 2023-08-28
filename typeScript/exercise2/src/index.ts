abstract class Person {
    firstName: string;
    lastName: string;
    age: number;
    address: string;

    constructor(firstName: string, lastName: string,
                age: number, address: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.address = address;
    }

}

class Patient extends Person {
    private patientID: string;
    phoneNumbe: string;
    emergencyContact: string;
    medicalHistory: Appointment[];

    constructor(firstName: string, lastName: string,
                patientID: string, age: number, address: string,
                phoneNumbe: string, emergencyContact: string,
                medicalHistory: Appointment[]) {
        super(firstName, lastName, age, address);
        this.patientID = patientID;
        this.phoneNumbe = phoneNumbe;
        this.emergencyContact = emergencyContact;
        this.medicalHistory = medicalHistory;
    }

    info(): string {
        return `first name ${this.firstName}
last name: ${this.lastName}
ID: ${this.patientID}`;
    }
    
    updateHistory(appointment: Appointment) {
        this.medicalHistory.push(appointment);
    }

    getPatientID(): string {
        return this.patientID;
    }
}

class MedicalStaff extends Person {
    staffID: string;
    position: string;
    department: string;

    constructor(firstName: string, lastName: string, age: number,
                address: string, staffID: string,
                position: string, department: string) {
        super(firstName, lastName, age, address);
        this.staffID = staffID;
        this.position = position;
        this.department = department;
    }
}

type availabilityList = Record <string, string[]>

class Doctor extends MedicalStaff {
    private doctorID: string;
    specialization: string;
    availability: availabilityList;
    agesRange: [number, number];

    constructor(firsName: string, lastName: string, doctorID: string,
                specialization: string, age: number, address: string,
                availability: availabilityList, position: string,
                staffID: string, department: string, agesRange: [number, number]) {
                    
        super(firsName, lastName, age, address, staffID,
            position, department);
        this.doctorID = doctorID;
        this.specialization = specialization;
        this.availability = availability;
        this.agesRange = agesRange;
    }

    info(): string {
        return `first name ${this.firstName}
last name: ${this.lastName}
ID: ${this.doctorID}
specialization: ${this.specialization}`;
    }

    getDoctorID(): string {
        return this.doctorID;
    }

}

type status = 'scheduled' | 'done' | 'cancelled';

class Appointment {
    patient: Patient;
    doctor: Doctor;
    date: string;
    time: string;
    status: status;

    constructor(patient: Patient, doctor: Doctor, date: string,
                time: string, status: status) {
        this.patient = patient;
        this.doctor = doctor;
        this.date = date;
        this.time = time;
        this.status = status;
    }

    info(): string {
        return `Appointment:
patient: ${this.patient}
doctor: ${this.doctor}
date: ${this.date}
time: ${this.time}`;
    }

}

class MedicalRecord {
    patient: Patient;
    doctor: Doctor;
    diagnosis: string;
    perception: string;

    constructor(patient: Patient, doctor: Doctor, diagnosis: string, perception: string) {
        this.patient = patient;
        this.doctor = doctor;
        this.diagnosis = diagnosis;
        this.perception = perception;
    }
}

class Hospital {
    name: string;
    doctors: Doctor[];
    patients: Patient[];
    appointments: Appointment[];
    medicalRecords: MedicalRecord[];

    constructor(name: string, doctors: Doctor[], patients: Patient[],
                appointments: Appointment[], medicalRecords: MedicalRecord[]) {
        this.name = name;
        this.doctors = doctors;
        this.patients = patients;
        this.appointments = appointments;
        this.medicalRecords = medicalRecords;
    }

    addPatient(patient: Patient) {
        this.patients.push(patient);
    }

    addDoctor(doctor: Doctor) {
        this.doctors.push(doctor);
    }

    addAppointment(appointment: Appointment) {
        const doctor = this.doctors.find(doc => doc.getDoctorID() === appointment.doctor.getDoctorID());
        if (typeof doctor === 'undefined') throw new Error(`no doctor found with id ${appointment.doctor.staffID}`);
        const availability = this.getDoctorAvailability(doctor.getDoctorID(), appointment.date);
        if (!availability.includes(appointment.time)) throw new Error('unavailable time');
        const [min, max] = doctor.agesRange;
        const age = appointment.patient.age;
        if (!(min <= age && age <= max)) throw new Error("the age of the patient isn't suitable. \
please change your age first.");
        this.appointments.push(appointment);
    }

    appointmentsInfo(): string {
        let info = '';
        this.appointments.forEach(el => {
            info += el.info() + '\n';
        })
        return info;
    }

    appointmentsOfDoctor(id: string): Appointment[] {
        return this.appointments.filter(el => el.doctor.getDoctorID() === id);
    }

    appointmentsOfPatient(id: string): Appointment[] {
        return this.appointments.filter(el => el.patient.getPatientID() === id);
    }

    appointmentsInDay(date: string) {
        return this.appointments.filter(el => el.date === date);
    }

    findDoctorBySpecialization(specialization: string) {
        return this.doctors.filter(el => el.specialization === specialization);
    }

    createMedicalRecord(record: MedicalRecord) {
        this.medicalRecords.push(record);
    }

    getRecordsOfPatient(patient: Patient) {
        return this.medicalRecords.filter(el => el.patient === patient);
    }

    getDoctorSchedule(date: string, id: string): Appointment[] {
        if (typeof this.doctors.find(doc => doc.getDoctorID() === id) === 'undefined') {
            throw new Error(`no doctor found with id ${id}`);
        }
        return this.appointments.filter(el => el.doctor.getDoctorID() === id && el.date === date);
    }

    getDoctorAvailability(id: string, date: string): string[] {
        const doctor = this.doctors.find(doc => doc.getDoctorID() === id);
        if (typeof doctor === 'undefined') throw new Error(`no doctor found with id ${id}`);
        const availabilityInDate = doctor.availability[date];
        if (typeof availabilityInDate === 'undefined') return [];
        return availabilityInDate;
    }

}

const doctor1 = new Doctor("John", "Doe", "D1", "Cardiologist", 35, "123 Main St", {}, "Senior Doctor", "S1", "Cardiology", [30, 60]);
const doctor2 = new Doctor("Jane", "Smith", "D2", "Pediatrician", 42, "456 Elm St", {}, "Senior Doctor", "S2", "Pediatrics", [0, 18]);

doctor1.availability = {
    '2023-08-27': [
        '10:00',
        '10:20',
        '10:30'
    ]
}

const patient1 = new Patient("Alice", "Johnson", "P1", 30, "789 Oak St", "555-1234", "Bob", []);
const patient2 = new Patient("Bob", "Williams", "P2", 40, "321 Pine St", "555-5678", "Charlie", []);

const hospital = new Hospital("HealthCare Hospital", [doctor1, doctor2], [patient1, patient2], [], []);

const appointment1 = new Appointment(patient1, doctor1, "2023-08-27", "10:00", "scheduled");
const appointment2 = new Appointment(patient2, doctor2, "2023-09-02", "14:30", "scheduled");

try {
    hospital.addAppointment(appointment1);    
} catch (error) {
    console.log(error);
}

try {
    hospital.addAppointment(appointment2);    
} catch (error) {
    console.log(error);
}

console.log("Appointments Info:");
console.log(hospital.appointmentsInfo());

console.log("\nAppointments of Doctor D1:");
console.log(hospital.appointmentsOfDoctor("D1"));

console.log("\nAppointments of Patient P2:");
console.log(hospital.appointmentsOfPatient("P2"));

console.log("\nAppointments on 2023-09-01:");
console.log(hospital.appointmentsInDay("2023-09-01"));

console.log("\nDoctors specializing in Cardiology:");
console.log(hospital.findDoctorBySpecialization("Cardiology"));
