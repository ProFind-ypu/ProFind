// // export type ProjectTemplate = {
// //   projectType: number;
// //   arabicTitle: string;
// //   englishTitle: string;
// //   scientificField: number[];
// //   targetEntities: string;
// //   projectDescription: string;
// //   expectedOutcomes: string;
// //   requiredSkillsTools: string;
// //   acquiredSkills: string;
// //   supervisors: string[];
// //   studentsnumber: number;
// //   students: Map<string, string>[];
// //   //[
// //   //   { id: 1, name: "name", uni_id: "202110076" },
// //   //   { id: 1, name: "name", uni_id: "202110076" },
// //   //   { id: 1, name: "name", uni_id: "202110076" }
// //   // ];
// // };

// export class ProposalTemplate {
//   projectType: number = 0;
//   arabicTitle: string = "";
//   englishTitle: string = "";
//   scientificField: number[] = [];
//   targetEntities: string = "";
//   projectDescription: string = "";
//   expectedOutcomes: string = "";
//   requiredSkillsTools: string = "";
//   acquiredSkills: string = "";
//   supervisors: string[] = [];
//   studentsnumber: number = 0;
//   students: Map<string, string>[] = [];

//   fill(
//     projectType: number,
//     arabicTitle: string,
//     englishTitle: string,
//     scientificField: number[],
//     targetEntities: string,
//     projectDescription: string,
//     expectedOutcomes: string,
//     requiredSkillsTools: string,
//     acquiredSkills: string,
//     supervisors: string[],
//     studentsnumber: number,
//     students: Map<string, string>[],
//   ): void {
//     this.projectType = projectType;
//     this.arabicTitle = arabicTitle;
//     this.englishTitle = englishTitle;
//     this.scientificField = scientificField;
//     this.targetEntities = targetEntities;
//     this.projectDescription = projectDescription;
//     this.expectedOutcomes = expectedOutcomes;
//     this.requiredSkillsTools = requiredSkillsTools;
//     this.acquiredSkills = acquiredSkills;
//     this.supervisors = supervisors;
//     this.studentsnumber = studentsnumber;
//     this.students = students;
//   }
//   // Instance method to convert current instance to JSON string
//   ProposalTemplateToJson(): string {
//     const serializable = {
//       ...this,
//       students: this.students.map((map) => Object.fromEntries(map)),
//     };
//     return JSON.stringify(serializable);
//   }

//   jsonToProposalTemplate(jsonStr: string): void {
//     const parsed = JSON.parse(jsonStr);
//     Object.assign(this, parsed);

//     // Convert students array of objects to array of Maps
//     this.students = parsed.students.map(
//       (obj: Record<string, string>) => new Map(Object.entries(obj)),
//     );
//     this.studentsnumber = this.students.length;
//   }
// }
export interface Student {
  name: string;
  uni_id: string;
}

export class ProposalTemplate {
  projectType: number = 0;
  arabicTitle: string = "";
  englishTitle: string = "";
  scientificField: number[] = [];
  targetEntities: string = "";
  projectDescription: string = "";
  expectedOutcomes: string = "";
  requiredSkillsTools: string = "";
  acquiredSkills: string = "";
  supervisors: string[] = [];
  studentsnumber: number = 0;
  students: Student[] = [];
  loaded: boolean = false;

  fill(
    projectType: number,
    arabicTitle: string,
    englishTitle: string,
    scientificField: number[],
    targetEntities: string,
    projectDescription: string,
    expectedOutcomes: string,
    requiredSkillsTools: string,
    acquiredSkills: string,
    supervisors: string[],
    studentsnumber: number,
    students: Student[],
  ): void {
    this.projectType = projectType;
    this.arabicTitle = arabicTitle;
    this.englishTitle = englishTitle;
    this.scientificField = scientificField;
    this.targetEntities = targetEntities;
    this.projectDescription = projectDescription;
    this.expectedOutcomes = expectedOutcomes;
    this.requiredSkillsTools = requiredSkillsTools;
    this.acquiredSkills = acquiredSkills;
    this.supervisors = supervisors;
    this.studentsnumber = studentsnumber;
    this.students = students;
  }

  ProposalTemplateToJson(): string {
    return JSON.stringify(this);
  }
  // ProposalTemplateToJson(): string {
  //   const {
  //     projectType,
  //     arabicTitle,
  //     englishTitle,
  //     scientificField,
  //     targetEntities,
  //     projectDescription,
  //     expectedOutcomes,
  //     requiredSkillsTools,
  //     acquiredSkills,
  //     supervisors,
  //     studentsnumber,
  //     students,
  //   } = this;

  //   // Manually build JSON string
  //   return `{\
  // "projectType": ${projectType},\
  // "arabicTitle": "${arabicTitle.replace(/"/g, '\\"')}",\
  // "englishTitle": "${englishTitle.replace(/"/g, '\\"')}",\
  // "scientificField": [${scientificField.join(",")}],\
  // "targetEntities": "${targetEntities.replace(/"/g, '\\"')}",\
  // "projectDescription": "${projectDescription.replace(/"/g, '\\"')}",\
  // "expectedOutcomes": "${expectedOutcomes.replace(/"/g, '\\"')}",\
  // "requiredSkillsTools": "${requiredSkillsTools.replace(/"/g, '\\"')}",\
  // "acquiredSkills": "${acquiredSkills.replace(/"/g, '\\"')}",\
  // "supervisors": [${supervisors.map((s) => `"${s.replace(/"/g, '\\"')}"`).join(",")}],\
  // "studentsnumber": ${studentsnumber},\
  // "students": [${students.map((s) => `{"name": "${s.name.replace(/"/g, '\\"')}", "uni_id": "${s.uni_id.replace(/"/g, '\\"')}"}`).join(",")}]\
  // }`;
  // }
  jsonToProposalTemplate(jsonStr: string): void {
    const parsed = JSON.parse(jsonStr);
    Object.assign(this, parsed);
    this.studentsnumber = this.students.length;
  }
}
