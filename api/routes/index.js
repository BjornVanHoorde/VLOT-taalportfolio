const useMethod = (func) => async (req, res, next) => {
  try {
    await func(req, res, next);
  } catch (err) {
    next(err);
  }
};

const registerOnboardingRoutes = (router) => {
  // Register onboarding routes
};

const registerStudentRoutes = (router) => {
  // Register student routes
};

const registerTeacherRoutes = (router) => {
  // Register teacher routes
};

const registerRoutes = (app) => {
  // Onboarding routes
  registerOnboardingRoutes(app);

  // Student routes
  registerStudentRoutes(app);

  // Teacher routes
  registerTeacherRoutes(app);

  // Fallback route
  app.use((req, res, next) => {
    next(new NotFoundError())
  });
};

export { registerRoutes };