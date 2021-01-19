import { reactive } from "vue";

export default () => {
  let studenInfo = reactive({
    list: [
      {
        name: "qqh",
        age: 18,
        id: 0,
      },
      {
        name: "hd",
        age: 20,
        id: 1,
      },
      {
        name: "el",
        age: 27,
        id: 2,
      },
    ],
  });

  let input = reactive({
    def: {
      age: "",
      name: "",
      id: "",
    },
  });

  const submit = (e) => {
    e.preventDefault();
    const copyinfo = Object.assign({}, studenInfo);
    const userInput = Object.assign({}, input.def);
    copyinfo.list.push(userInput);
    studenInfo = reactive(copyinfo);
    input.def.age = "";
    input.def.name = "";
    input.def.id = "";
  };

  return {
    studenInfo,
    input,
    submit,
  };
};
