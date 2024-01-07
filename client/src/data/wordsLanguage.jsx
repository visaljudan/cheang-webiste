export const getHome = (language) => {
  switch (language) {
    case "en":
      return "Home";
    case "kh":
      return "ទំព័រដើម";
    case "zh":
      return "主页";
    default:
      return "Home";
  }
};

export const getService = (language) => {
  switch (language) {
    case "en":
      return "Service";
    case "kh":
      return "សេវាកម្ម";
    case "zh":
      return "服务";
    default:
      return "serivce";
  }
};

export const getAbout = (language) => {
  switch (language) {
    case "en":
      return "About";
    case "kh":
      return "អំពីយើង";
    case "zh":
      return "关于我们";
    default:
      return "About";
  }
};

export const getLanguage = (language) => {
  switch (language) {
    case "en":
      return "Language";
    case "kh":
      return "ភាសា";
    case "zh":
      return "语言";
    default:
      return "Language";
  }
};

export const getSignup = (language) => {
  switch (language) {
    case "en":
      return "Sign Up";
    case "kh":
      return "បង្កើតអាខោន";
    default:
      return "报名";
  }
};

export const getStarted = (language) => {
  switch (language) {
    case "en":
      return "Choose a service to get started.";
    case "kh":
      return "ជ្រើសរើសសេវាដើម្បីចាប់ផ្ដើម";
    case "zh":
      return "选择一项服务即可开始。";
    default:
      return "Choose a service to get started.";
  }
};

export const getSearch = (language) => {
  switch (language) {
    case "en":
      return "Search for serivce";
    case "kh":
      return "ស្វែងរកសេវាកម្ម";
    default:
      return "搜索服务";
  }
};
