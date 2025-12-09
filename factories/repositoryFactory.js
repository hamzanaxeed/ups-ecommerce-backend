
const userRepos = require("../repositories/user_Operations");
const techRepos = require("../repositories/technician_Operations");

function createUserRepositories(mode = "default") {
    
    const {
        AddUserRepository,
        EditUserRepository,
        DeactivateUserRepository,
        ActivateUserRepository,
        GetActiveUserRepository,
        GetAllActiveUsersRepository,
        GetAllUsersRepository,
    } = userRepos;

    return {
        addRepo: new AddUserRepository(),
        editRepo: new EditUserRepository(),
        deactivateRepo: new DeactivateUserRepository(),
        activateRepo: typeof ActivateUserRepository !== 'undefined' ? new ActivateUserRepository() : null,
        getActiveRepo: new GetActiveUserRepository(),
        getAllActiveRepo: new GetAllActiveUsersRepository(),
        getAllRepo: new GetAllUsersRepository(),
    };
}

function createTechnicianRepositories(mode = "default") {
    const {
        AddTechnicianRepository,
        EditTechnicianRepository,
        DeactivateTechnicianRepository,
        GetActiveTechnicianRepository,
        GetAllActiveTechniciansRepository,
        GetAllTechniciansRepository,
    } = techRepos;

    return {
        addRepo: new AddTechnicianRepository(),
        editRepo: new EditTechnicianRepository(),
        deactivateRepo: new DeactivateTechnicianRepository(),
        getActiveRepo: new GetActiveTechnicianRepository(),
        getAllActiveRepo: new GetAllActiveTechniciansRepository(),
        getAllRepo: new GetAllTechniciansRepository(),
    };
}

module.exports = {
    createUserRepositories,
    createTechnicianRepositories,
};
