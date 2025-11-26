class ServiceRequestReadService {
    constructor({ allRepo, userRepo, technicianRepo }) {
        this.allRepo = allRepo;
        this.userRepo = userRepo;
        this.technicianRepo = technicianRepo;
    }

    async getAll() {
        const data = await this.allRepo.execute();
        return { status: 200, data };
    }

    async getByUser(user_Id) {
        const data = await this.userRepo.execute(user_Id);
        return { status: 200, data };
    }

    async getByTechnician(technician_id) {
        const data = await this.technicianRepo.execute(technician_id);
        return { status: 200, data };
    }
}

module.exports = ServiceRequestReadService;

