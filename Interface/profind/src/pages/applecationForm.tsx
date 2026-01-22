import * as htmlToImage from "html-to-image";
import "../components/complex/FormComponent/formStyle.css";
import uniimg from "../assets/UniLog.webp";
import CheckBox from "../components/complex/FormComponent/CheckBox";
import TextAria from "../components/complex/FormComponent/TextAria";
import DivRow from "../components/complex/FormComponent/DivRow";
import DivTitle from "../components/complex/FormComponent/DivTitle";
import DivData from "../components/complex/FormComponent/DivData";
import InputForm from "../components/complex/FormComponent/InputForm";
import SupervisorStackBlock from "../components/complex/FormComponent/SupervisorStackBlock";
import CallOutWarning from "../components/complex/CallOutWarning";
import FormPargraph from "../components/complex/FormComponent/FormPargraph";
import { useEffect, useRef, useState } from "react";
import ChackBoxGroup from "../components/complex/FormComponent/ChackboxGroup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSingelProposal } from "../class/Services/_getProposalsFromServer";
import type { Proposal } from "../class/Proposal";
import { ProposalTemplate } from "../class/ProposalTemplate";
import StudentGroupFields from "../components/complex/FormComponent/StudentGroupField";
import { postProposal } from "../class/Services/_postProposal";
import { UseAuth } from "../Auth/AuthContext";
import ProjectService from "../class/Services/projectService";
import {
  approveProposal,
  disapproveProposal,
  updateProposal,
} from "../class/Services/_putProposal";
import DropdownMenu from "../components/complex/DropdownMenu";
import ProfessorsService from "../class/Services/ProfessorsService";
import type { Professor } from "../class/Professor";
const projectType = [
  "تطبيقي",
  "ماقبل التخرج",
  "تخرج",
  "ماقبل , ومستمر للمتابعة في مشروع تخرج",
];
const projectFields = [
  "أمن معلومات ",
  "معالجة إشارة و صور ",
  "هندسة برمجيات ",
  "قواعد وتحليل بيانات ",
  "ذكاء صنعي ",

  "أنترنت الأشياء IOT ",
  "اتصالات ",
  "تحكم وأتمتة ",
  "شبكات , وبروتوكولات ",
];
//TODO unify the naming
export default function ApplicationForm() {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const proposalId = searchParams.get("id");
  const projectId = searchParams.get("projectId");
  const reviewMode = searchParams.get("review");
  const newMode = searchParams.get("new");
  const [professors, setProfessors] = useState<Professor[]>();
  const [proposal, setProposal] = useState<Proposal>();
  const [professorId, setProfessorId] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [form] = useState<ProposalTemplate>(new ProposalTemplate());
  // const [newForm, setNewForm] = useState(new ProposalTemplate());
  const elementRef = useRef(null);
  let newForm = new ProposalTemplate();
  const { user } = UseAuth();
  if (reviewMode == "true") {
    console.log("reviewMOde");
  }
  if (user == null) {
    nav("/login", { replace: true });
  }
  newForm = new ProposalTemplate();
  useEffect(() => {
    const fetchProposal = async () => {
      try {
        // const proposal = await getProposals(Number.parseInt(searchParam));
        // for now only (testing)
        const proposal = await getSingelProposal(Number.parseInt(proposalId!));
        if (proposal != null) {
          setProposal(proposal);
          form.jsonToProposalTemplate(proposal.formData);
          form.loaded = true;
        } else {
          setLoading(true);
        }
      } catch (error) {
        console.error("Error fetching Proposals:", error);
      }
    };
    const fetchProject = async () => {
      try {
        let projects = ProjectService.getInstance().getProjects();
        if (projects.length === 0) {
          projects = await ProjectService.getInstance().fetchProjects();
        }
        const foundProject = projects.find(
          (p) => p.id === parseInt(projectId!),
        );
        if (foundProject) {
          setProfessorId(Number.parseInt(foundProject.professorId));
        } else {
          setProfessorId(user?.id);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };
    const loadProfessors = async () => {
      try {
        const service = ProfessorsService.getInstance();
        const professors = await service.fetchProjects();
        setProfessors(professors);
      } catch (error) {
        console.error("Failed to fetch professors:", error);
        setProfessors([]);
      }
    };
    if (proposalId != null && proposalId != "NaN" && proposalId != "null") {
      fetchProposal();
    } else {
      form.loaded = true;
    }
    if (newMode != null) {
      loadProfessors();
    }
    fetchProject();
  }, [proposalId, professorId, projectId, form]);
  if (loading || (!form.loaded && (newMode || reviewMode))) {
    return <h1>loading </h1>;
  }
  // console.log(form.ProposalTemplateToJson());
  newForm.jsonToProposalTemplate(form.ProposalTemplateToJson());

  return (
    <main className="flex flex-col font-bold justify-center  text-black bg-gray-200 lg:px-20 ">
      <div id="form-to-export" ref={elementRef} className="bg-gray-200 px-2">
        {newMode == null ? (
          ""
        ) : (
          <div className="w-full flex flex-col items-center  justify-center  ">
            <div className="w-fit ">
              <label className="text-lg">choose your Professor</label>
              <DropdownMenu
                textClass="text-black text-lg "
                backgroundClass="bg-black rounded mt-1"
                placeholder="Professor Name"
                options={professors!.map((p) => ({
                  label: p.fullName,
                  value: p.id.toString(),
                }))}
                onSelect={() => {}}
              />
            </div>
          </div>
        )}

        <div className="pt-10"></div>
        <DivRow>
          <DivData className="text-start text-xl space-y-1">
            <FormPargraph text="جامعة اليرموك الخاصة" outline={false} />

            <FormPargraph
              text="كلية هندسة المعلوماتية والاتصالات"
              outline={false}
              className="text-sm text-gray-600 pr-1"
            />
          </DivData>
          <DivData className="flex justify-center">
            <img src={uniimg} className="outline-0! hidden sm:block" />
          </DivData>

          <DivData className="text-end text-xl space-y-1">
            <FormPargraph text="Yarmouk Private University" outline={false} />
            <FormPargraph
              text="&amp; Faculty of Informatics&#10; Communication  Engineering &#9;"
              outline={false}
              className="text-sm text-gray-600 pl-2"
            />
          </DivData>
        </DivRow>
        <DivRow>
          <DivData>
            <FormPargraph
              text="استمارة توصيف مشروع"
              outline={false}
              className=" text-center text-3xl! p-6 pb-7"
            />
          </DivData>
        </DivRow>
        <DivRow>
          <DivData>
            <FormPargraph
              outline={false}
              className=" text-right"
              text="رقم الاستمارة:"
            />
          </DivData>
          <DivData>
            <FormPargraph
              outline={false}
              className="text-left"
              text="  تاريخ تقديم الاستمارة : ..../....../....."
            />
          </DivData>
        </DivRow>
        <DivRow>
          <DivTitle>
            <FormPargraph text="نوع المشروع" />
          </DivTitle>
          <DivData className="grid grid-cols-2 grid-row-2 ">
            <ChackBoxGroup
              titles={projectType}
              value={[form.projectType]}
              name={"proposalType"}
              singleSelect={true}
              onChange={(s) => (newForm.projectType = s[0])}
            />
          </DivData>
        </DivRow>
        <DivRow>
          <DivTitle>
            <FormPargraph text="عنوان المشروع باللغة العربية" />
          </DivTitle>
          <DivData>
            <InputForm
              id=""
              name=""
              _value={form?.arabicTitle}
              onchange={(newvalue) => {
                newForm.arabicTitle = newvalue;
              }}
            />
          </DivData>
        </DivRow>
        <DivRow>
          <DivTitle>
            <FormPargraph text="عنوان المشروع باللغة الإنكليزية" />
          </DivTitle>
          <DivData>
            {" "}
            <InputForm
              id=""
              name=""
              _value={form?.englishTitle}
              onchange={(e) => (newForm.englishTitle = e)}
            />
          </DivData>
        </DivRow>
        <DivRow className=" w-full">
          <DivTitle>
            <FormPargraph text="المجال العلمي للمشروع" />
          </DivTitle>
          <DivData className="overflow-auto w-[200%] outline  scrollbar grid grid-col grid-cols-5">
            <ChackBoxGroup
              titles={projectFields}
              value={[1, 3]}
              name={"proposalType"}
              onChange={(selected) => (newForm.scientificField = selected)}
            />
          </DivData>
        </DivRow>
        <DivRow>
          <DivTitle>
            <FormPargraph text="الجهة المستهدفة / الجهات المستفيدة من المشروع" />
          </DivTitle>
          <DivData>
            <TextAria
              value={form?.targetEntities}
              onchange={(e) => (newForm.targetEntities = e)}
            />
          </DivData>
        </DivRow>
        <DivRow>
          <DivTitle>
            <FormPargraph text="وصف المشروع وأهدافه" />
          </DivTitle>
          <DivData>
            <TextAria
              value={form?.projectDescription}
              onchange={(e) => (newForm.projectDescription = e)}
            />
          </DivData>
        </DivRow>
        <DivRow>
          <DivTitle>
            <FormPargraph text="النتائج التطبيقية و مخرجات المشروع المتوخاة" />
          </DivTitle>
          <DivData>
            <TextAria
              value={form?.expectedOutcomes}
              onchange={(e) => (newForm.expectedOutcomes = e)}
            />
          </DivData>
        </DivRow>
        <DivRow>
          <DivTitle>
            <FormPargraph text="الخبرات والأدوات اللازمة للمشروع" />
          </DivTitle>
          <DivData>
            <TextAria
              value={form?.requiredSkillsTools}
              onchange={(e) => (newForm.requiredSkillsTools = e)}
            />
          </DivData>
        </DivRow>
        <DivRow>
          <DivTitle>
            <FormPargraph text="الخبرات المكتسبة من المشروع" />
          </DivTitle>
          <DivData>
            <TextAria
              value={form?.acquiredSkills}
              onchange={(e) => (newForm.acquiredSkills = e)}
            />
          </DivData>
        </DivRow>
        <DivRow>
          <DivTitle>
            <FormPargraph text="أسماء السادة مشرفي المشروع" />
          </DivTitle>
          <DivData>
            <SupervisorStackBlock
              values={form.supervisors}
              onchange={(v) => (newForm.supervisors = v)}
            />
          </DivData>
        </DivRow>
        <DivRow>
          <DivTitle className="hidden sm:block">
            <FormPargraph text="أسماء الطلاب المسجلين في المشروع" />
          </DivTitle>
          <DivData>
            <div className="p-2 font-bold sm:hidden">
              <FormPargraph text="أسماء الطلاب المسجلين في المشروع" />
            </div>
            <StudentGroupFields
              values={form.students}
              onchange={(newstds) => {
                newForm.students = newstds;
              }}
            />
          </DivData>
        </DivRow>
        <div className="flex flex-row justify-between p-5" dir="rtl">
          <p className="text-transparent text-nowrap text-xs!"></p>

          <p className=" text-center text-nowrap">
            عميد الكلية
            <br />
            ا.د. معتصم شفاعمري
          </p>
        </div>
        <div className="w-fit! flex flex-col sm:flex-row pt-2 px-3">
          <CheckBox
            className="w-fit flex-row!"
            title="Desktop View"
            onClick={ToggleView}
          />
          <CallOutWarning
            classname="sm:hidden"
            text="this is not how the form will be sent ,click on show in Desktop View for expected result"
          />
        </div>
      </div>
      <div className="flex w-full flex-col space-y-7 items-center justify-center pb-10">
        <CallOutWarning
          classname="text-center"
          text="Please varify the form before submetting.
          the form will be sent for reviewing ,and you will get notifecation on the app and on the provided email of the result.
        "
        />
        {reviewMode == "true" ? (
          <div className="max-w-[50%] w-full flex flex-row justify-evenly items-center ">
            <button
              id="Formbutton"
              className="bg-green-600"
              onClick={async () =>
                (await approveProposal(proposal!.id!, user!)) &&
                nav("/dashboard", { replace: true })
              }
            >
              Approve
            </button>
            <button
              id="Formbutton"
              className="bg-amber-600"
              onClick={async () => {
                let finalProposal: Proposal;
                if (proposal) {
                  // Existing proposal - update it
                  finalProposal = {
                    ...proposal,
                    formData: newForm.ProposalTemplateToJson(),
                    professorId: professorId ?? proposal.professorId, // Use existing if professorId not available
                    projectId:
                      Number.parseInt(projectId!) ?? proposal.projectId, // Use existing if projectId not available
                    updatedAt: new Date().toISOString(),
                  };
                } else {
                  // New proposal - create from scratch
                  finalProposal = {
                    id: 0,
                    studentId: 0,
                    title: form.englishTitle ?? "untitled Proposal",
                    professorId: professorId!,
                    projectId: Number.parseInt(projectId!),
                    status: "pending",
                    message: "",
                    formData: newForm.ProposalTemplateToJson(),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                  };
                }
                if (
                  (await updateProposal(proposal!.id!, user!, finalProposal)) ==
                  true
                ) {
                  nav("/dashboard", { replace: true });
                }
              }}
            >
              Update
            </button>
            <button
              id="Formbutton"
              className="bg-red-700"
              onClick={async () =>
                (await disapproveProposal(proposal!.id!, user!)) &&
                nav("/dashboard", { replace: true })
              }
            >
              Disapprove
            </button>
          </div>
        ) : (
          <div className="space-x-10">
            <button
              className="bg-black text-white text-xl px-5 py-2 rounded hover:bg-gray-900"
              onClick={() => handleSubmet()}
            >
              Submit
            </button>
            <button
              className="bg-black text-white text-xl px-5 py-2 rounded hover:bg-gray-900"
              onClick={downloadAsPng}
            >
              Download as Image
            </button>
          </div>
        )}
      </div>
    </main>
  );
  function handleSubmet() {
    {
      // Create final proposal object
      let finalProposal: Proposal;

      if (proposal) {
        // Existing proposal - update it
        finalProposal = {
          ...proposal,
          formData: newForm.ProposalTemplateToJson(),
          professorId: professorId ?? proposal.professorId, // Use existing if professorId not available
          projectId: Number.parseInt(projectId!) ?? proposal.projectId, // Use existing if projectId not available
          updatedAt: new Date().toISOString(),
        };
      } else {
        // New proposal - create from scratch
        finalProposal = {
          id: 0,
          studentId: 0,
          title: form.englishTitle ?? "untitled Proposal",
          professorId: professorId!,
          projectId: Number.parseInt(projectId!),
          status: "pending",
          message: "",
          formData: newForm.ProposalTemplateToJson(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }
      postProposal(finalProposal, user!);
      if (user?.roles.toUpperCase() == "PROFESSOR")
        nav("/myprojects", { replace: true });
      else nav("/dashboard", { replace: true });
    }
  }
  function ToggleView(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked)
      document
        .querySelector("meta")
        ?.setAttribute("content", "width=device-width, initial-scale=0.1");
    else
      document
        .querySelector("meta")
        ?.setAttribute("content", "width=device-width, initial-scale=1.0");
  }

  async function downloadAsPng() {
    if (elementRef.current) {
      htmlToImage
        .toPng(elementRef.current, { cacheBust: true })
        .then((dataUrl) => {
          // Create a link element to trigger the download
          const link = document.createElement("a");
          if (newForm.englishTitle != null) {
            link.download = newForm.englishTitle + ".png";
          } else {
            link.download = "untitledProposal.png";
          }

          link.href = dataUrl;
          link.click();
          document.body.removeChild(link);
        })
        .catch((err) => {
          console.error("oops, something went wrong!", err);
        });
    }
  }
}
