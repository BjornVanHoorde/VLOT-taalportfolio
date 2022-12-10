import KlasService from "./modules/Klas/Klas.service";

const CheckTeacherClasses = async (userId: number, classId: number) => {
  const klasService = new KlasService();
  let access = false;

  const klassen = await klasService.byTeacher(userId);
  klassen.forEach((klas) => {
    if (klas.id == classId) {
      access = true;
    }
  });

  return access;
};

export { CheckTeacherClasses };
