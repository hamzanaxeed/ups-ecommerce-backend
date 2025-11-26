class IResourceRepository {
    async execute() {
        throw new Error("Pure virtual function must be implemented");
    }
}

module.exports = IResourceRepository;
