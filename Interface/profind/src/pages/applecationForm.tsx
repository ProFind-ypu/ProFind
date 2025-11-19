import "../components/complex/FormComponent/formStyle.css";
import uniimg from "../assets/UniLog.webp";
import CheckBox from "../components/complex/FormComponent/CheckBox";
import StudentField from "../components/complex/FormComponent/StudentField";
import TextAria from "../components/complex/FormComponent/TextAria";
import DivRow from "../components/complex/FormComponent/DivRow";
import DivTitle from "../components/complex/FormComponent/DivTitle";
import DivData from "../components/complex/FormComponent/DivData";
import InputForm from "../components/complex/FormComponent/InputForm";
import SupervisorStackBlock from "../components/complex/FormComponent/SupervisorStackBlock";
import CallOutWarning from "../components/complex/CallOutWarning";
import FormPargraph from "../components/complex/FormComponent/FormPargraph";
import { useEffect, useState } from "react";
import ChackBoxGroup from "../components/complex/FormComponent/ChackboxGroup";

function unhideStudentFields(stdAmount: number) {
  for (let index = 0; index < 5; index++) {
    const el = document.getElementById("studentfield" + index);
    if (el)
      if (index > stdAmount) {
        el.hidden = true;
      } else {
        el.hidden = false;
      }
  }
}

export default function ApplicationForm() {
  const [timeDate, setTimeDate] = useState([
    getTime(new Date()),
    getDate(new Date()),
  ]);
  useEffect(() => {
    setInterval(() => {
      SetTimeDate();
    }, 60000);
  });
  return (
    <main className="flex flex-col font-bold justify-center  text-black bg-gray-200 lg:px-20 ">
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
            titles={[
              "تطبيقي",
              "ماقبل التخرج",
              "تخرج",
              "ماقبل , ومستمر للمتابعة في مشروع تخرج",
            ]}
            name={"ss"}
          />
        </DivData>
      </DivRow>
      <DivRow>
        <DivTitle>
          <FormPargraph text="عنوان المشروع باللغة العربية" />
        </DivTitle>
        <DivData>
          <InputForm id="" name="" />
        </DivData>
      </DivRow>
      <DivRow>
        <DivTitle>
          <FormPargraph text="عنوان المشروع باللغة الإنكليزية" />
        </DivTitle>
        <DivData>
          {" "}
          <InputForm id="" name="" />
        </DivData>
      </DivRow>
      <DivRow className=" w-full">
        <DivTitle>
          <FormPargraph text="المجال العلمي للمشروع" />
        </DivTitle>
        <DivData className="overflow-auto w-[200%] outline  scrollbar grid grid-col grid-cols-5">
          <CheckBox title="أمن معلومات " />
          <CheckBox title="معالجة إشارة و صور " />
          <CheckBox title="هندسة برمجيات " />
          <CheckBox title="قواعد وتحليل بيانات " />
          <CheckBox title="ذكاء صنعي " />

          <CheckBox title="أنترنت الأشياء IOT " />
          <CheckBox title="اتصالات " />
          <CheckBox title="تحكم وأتمتة " />
          <CheckBox title="شبكات , وبروتوكولات " />
        </DivData>
      </DivRow>
      <DivRow>
        <DivTitle>
          <FormPargraph text="الجهة المستهدفة / الجهات المستفيدة من المشروع" />
        </DivTitle>
        <DivData>
          <TextAria />
        </DivData>
      </DivRow>
      <DivRow>
        <DivTitle>
          <FormPargraph text="وصف المشروع وأهدافه" />
        </DivTitle>
        <DivData>
          <TextAria />
        </DivData>
      </DivRow>
      <DivRow>
        <DivTitle>
          <FormPargraph text="النتائج التطبيقية و مخرجات المشروع المتوخاة" />
        </DivTitle>
        <DivData>
          <TextAria />
        </DivData>
      </DivRow>
      <DivRow>
        <DivTitle>
          <FormPargraph text="الخبرات والأدوات اللازمة للمشروع" />
        </DivTitle>
        <DivData>
          <TextAria />
        </DivData>
      </DivRow>
      <DivRow>
        <DivTitle>
          <FormPargraph text="الخبرات المكتسبة من المشروع" />
        </DivTitle>
        <DivData>
          <TextAria />
        </DivData>
      </DivRow>
      <DivRow>
        <DivTitle>
          <FormPargraph text="أسماء السادة مشرفي المشروع" />
        </DivTitle>
        <DivData>
          <SupervisorStackBlock />
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
          <div className="flex flex-row w-full items-center  ">
            <FormPargraph text="عدد الطلاب : " className=" text-nowrap pr-4" />
            <input
              type="number"
              id="studentAmount"
              max={4}
              min={1}
              defaultValue={1}
              className="max-w-8 pr-1 border-0 focus:outline-0"
              onChange={(event) =>
                unhideStudentFields(Number(event.target.value))
              }
            />
          </div>

          <StudentField id="studentfield" hidden={false} />
          <StudentField id="studentfield2" />
          <StudentField id="studentfield3" />
          <StudentField id="studentfield4" />
        </DivData>
      </DivRow>
      <div className="flex flex-row justify-between p-5" dir="rtl">
        <p className="text-transparent text-nowrap text-xs!">
          modified at:{timeDate[0]}:{timeDate[1]}
        </p>

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
    </main>
  );
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
  function SetTimeDate() {
    const dateObject = new Date();
    setTimeDate([getTime(dateObject), getDate(dateObject)]);
  }
  function getTime(dateObject: Date): string {
    return (
      dateObject.getHours() +
      " : " +
      dateObject.getMinutes() +
      " : " +
      dateObject.getSeconds()
    );
  }
  function getDate(dateObject: Date): string {
    return dateObject.toLocaleDateString("en-US");
  }
}
