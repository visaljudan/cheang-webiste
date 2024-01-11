export const getServicesAndSubServices = (language) => {
  const services = {
    en: {
      MainService: [
        "General Repairs Service",
        "Home Renovations Service",
        "Electrical Services",
        "Plumbing Solutions Service",
        "Carpentry and Woodworking Services",
        "Appliance Installation and Repair Services",
        "Outdoor Maintenance Services",
        "Handyman Assistance Services",
      ],
      SubService: {
        "General Repairs Service": [
          "Leaky faucets Service",
          "Repairing walls Service",
          "Repairing doors Service",
          "Repairing windows Service",
          "Minor plumbing Services",
          "Electrical issues Service",
        ],
        "Home Renovations Service": [
          "Revamping kitchen services",
          "Bathroom renovations",
          "Floor installations",
          "Interior painting",
          "Exterior painting",
        ],
        "Electrical Services": [
          "Fixtures service",
          "Installations service",
          "Wiring upgrades service",
          "Lighting solutions service",
          "Troubleshooting electrical problem",
        ],
        "Plumbing Solutions Service": [
          "Unclogging drains service",
          "Fixing leaks service",
          "Install fixtures service",
          "Plumbing inspections",
        ],
        "Carpentry and woodworking Services": [
          "Repairing wooden structures",
          "wooden sculpture",
        ],
        "Appliance Installation and Repair Services": [
          "Installing new appliance",
          "Repair various household appliance",
        ],
        "Outdoor Maintenance Services": [
          "Landscaping assistance",
          "Deck maintenance",
          "Fence installation",
          "Fence repairs",
          "Exterior",
        ],
        "Handyman Assistance Services": [
          "Tasks around the house",
          "Small scale project",
        ],
      },
    },
    kh: {
      MainService: [
        "សេវាកម្មជួសជុលទូទៅ",
        "សេវាកម្មកែលំអរគេហដ្ឋាន",
        "សេវាកម្មអគ្គិសនី",
        "សេវាកម្មជួសជុលប្រព័ន្ធទឹក",
        "ជាងឈើ",
        "សេវាកម្មដំឡើង និងជួសជុលឧបករណ៍ក្នុងគេហដ្ឋាន",
        "សេវាកម្មថែទាំសួនច្បារខាងក្រៅ",
        "ជំនួយការជាង",
      ],
      SubService: {
        សេវាកម្មជួសជុលទូទៅ: [
          "ការជួសជុលក្បាលម៉ាស៊ីន",
          "សេវាកម្មជួសជុលជញ្ជាំង",
          "សេវាកម្មជួសជុលទ្វារ",
          "សេវាកម្មជួសជុលបង្អួច",
          "សេវាកម្មជួសជុលប្រព័ន្ធទឹកទូទៅ",
          "សេវាកម្មជួសជុលប្រព័ន្ធភ្លើងទូទៅ",
        ],
        សេវាកម្មកែលំអរគេហដ្ឋាន: [
          "សេវាកម្មជួសជុលផ្ទះបាយ",
          "សេវាកម្មជួសជុលបន្ទប់ទឹក",
          "សេវាកម្មជួសជុលកម្រាលឥដ្ឋ",
          "ការលាបពណ៌ខាងក្នុង",
          "ការលាបពណ៌ខាងក្រៅ",
        ],
        សេវាកម្មអគ្គិសនី: [
          "សេវាកម្មដំឡើងឧបករណ៍អគ្គីសនី ",
          "សេវាកម្មតម្លើងខ្សែភ្លើង",
          "សេវាកម្មតរជួសជុលអំពូលភ្លើង",
          "សេវាកម្មដោះស្រាយបញ្ហាអគ្គិសនី ",
        ],
        សេវាកម្មជួសជុលប្រព័ន្ធទឹក: [
          "ដោះស្រាយបញ្ហាប្រព័ន្ធលូ",
          "សេវាកម្មជួសជុលការលេចធ្លាយ ",
          "សេវាកម្មតរប្រព័ន្ធទឹក",
          "សេវាកម្មត្រួតពិនិត្យប្រព័ន្ធទឹក",
        ],
        ជាងឈើ: ["ជួសជុលគ្រឿងសង្ហារឹម", "ជាងចម្លាក់ឈើ"],
        "សេវាកម្មដំឡើង និងជួសជុលឧបករណ៍ក្នុងគេហដ្ឋាន": [
          "តម្លើងឧបករណ៍ក្នុងគេហដ្ឋានថ្មី",
          "ជួសជុលឧបករណ៍ក្នុងគេហដ្ឋាន",
        ],
        សេវាកម្មថែទាំសួនច្បារខាងក្រៅ: [
          "ការកែលំអរសួនច្បារ",
          "ជួសជុលដំបូល",
          "តម្លើងរបង",
          "ជួសជុលរបង",
          "Exterior",
        ],
        ជំនួយការជាង: [
          "ការងារផ្សេងៗ ដែលនៅជុំវិញគេហដ្ឋាន",
          "គម្រោងជួសជុលខ្នាតតូច",
        ],
      },
    },
    zh: {
      MainService: [
        "一般维修服务",
        "家居装修服务",
        "电力服务",
        "管道解决方案服务",
        "木工和木工服务",
        "电器安装和维修服务",
        "户外维护服务",
        "勤杂工协助服务",
      ],
      SubService: {
        一般维修服务: [
          "水龙头漏水服务",
          "修墙服务",
          "修门服务",
          "修复Windows服务",
          "小型管道服务",
          "电气问题服务",
        ],
        家居装修服务: [
          "改造厨房服务",
          "卫生间改造",
          "地板装置",
          "室内绘画",
          "外墙画",
        ],
        电力服务: [
          "安装服务",
          "布线升级服务",
          "照明解决方案服务",
          "解决电气问题",
        ],
        管道解决方案服务: [
          "疏通排水沟服务",
          "修复泄漏服务",
          "安装固定装置服务",
          "管道检查",
        ],
        木工和木工服务: ["修复木结构", "木雕"],
        电器安装和维修服务: ["安装新设备", "修理各种家用电器"],
        户外维护服务: [
          "园林绿化援助",
          "甲板维护",
          "围栏安装",
          "修复栅栏",
          "外部的",
        ],
        勤杂工协助服务: ["房子周围的任务", "小型项目"],
      },
    },
  };
  return services[language] || services.en; // Default to English if language not found
};
