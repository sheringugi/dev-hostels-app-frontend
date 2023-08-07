import React from "react";
import HostelOwner_Navbar from "./HostelOwner_Navbar";
import { Survey } from "survey-react";
import "survey-core/defaultV2.min.css";
// import "./Survey_step1.css";
const roomTypeOptions = [
  {
    value: "private",
    text: "Private",
  },
  {
    value: "single",
    text: "Single",
  },
  {
    value: "double",
    text: "Double",
  },
  {
    value: "two-sharing",
    text: "Two-Sharing",
  },
  {
    value: "four-sharing",
    text: "Four-Sharing",
  },
];
const booleanOptions = [
  {
    name: "has_tv",
    text: "TV",
  },
  {
    name: "has_kitchen",
    text: "Kitchen",
  },
  {
    name: "has_air_conditioner",
    text: "Air Conditioner",
  },
  {
    name: "has_internet",
    text: "Internet",
  },
  {
    name: "has_study_room",
    text: "Study Room",
  },
  {
    name: "has_meals",
    text: "Meals",
  },
];
function SurveyStep1() {
  const json = {
    title: "Hostel Hosting Survey",
    pages: [
      {
        name: "page1",
        elements: [
          {
            type: "radiogroup",
            name: "room_type",
            title: "Tell us about your place",
            isRequired: true,
            choices: roomTypeOptions,
          },
          {
            type: "text",
            name: "address",
            title: "Tell us your location",
            isRequired: true,
          },
          {
            type: "text",
            name: "total_beds",
            title: "Total Beds",
            isRequired: true,
            inputType: "number",
            validators: [{ type: "numeric", minValue: 0 }],
          },
          {
            type: "text",
            name: "total_bedrooms",
            title: "Total Bedrooms",
            isRequired: true,
            inputType: "number",
            validators: [{ type: "numeric", minValue: 0 }],
          },
          {
            type: "text",
            name: "total_bathrooms",
            title: "Total Bathrooms",
            isRequired: true,
            inputType: "number",
            validators: [{ type: "numeric", minValue: 0 }],
          },
        ],
      },
      {
        name: "page2",
        elements: booleanOptions.map((option) => ({
          type: "radiogroup",
          name: option.name,
          title: `Does your place have ${option.text}?`,
          isRequired: true,
          choices: [
            { value: "yes", text: "Yes" },
            { value: "no", text: "No" },
          ],
        })),
      },
      {
        name: "page3",
        elements: [
          {
            type: "text",
            name: "price_per_day",
            title: "Price Per Day",
            isRequired: true,
            inputType: "number",
            validators: [{ type: "numeric", minValue: 0 }],
          },
          {
            type: "file",
            name: "image_url_1",
            title: "Upload an Image",
            isRequired: true,
            maxSize: 0, // Set the maximum file size (0 for no limit)
            imageWidth: 150, // Set the width of the image preview
            imageHeight: 150, // Set the height of the image preview
            acceptedTypes: "image/*", // Set the accepted file types (e.g., "image/*" for images)
          },
          {
            type: "file",
            name: "image_url_2",
            title: "Upload Additional Image 2",
            isRequired: false,
            maxSize: 0,
            imageWidth: 150,
            imageHeight: 150,
            acceptedTypes: "image/*",
          },
          {
            type: "file",
            name: "image_url_3",
            title: "Upload Additional Image 3",
            isRequired: false,
            maxSize: 0,
            imageWidth: 150,
            imageHeight: 150,
            acceptedTypes: "image/*",
          },
          {
            type: "file",
            name: "image_url_4",
            title: "Upload Additional Image 4",
            isRequired: false,
            maxSize: 0,
            imageWidth: 150,
            imageHeight: 150,
            acceptedTypes: "image/*",
          },
          {
            type: "file",
            name: "image_url_5",
            title: "Upload Additional Image 5",
            isRequired: false,
            maxSize: 0,
            imageWidth: 150,
            imageHeight: 150,
            acceptedTypes: "image/*",
          },
          // {
          //   type: "file",
          //   name: "additional_image_5",
          //   title: "Upload Additional Image 5",
          //   isRequired: false,
          //   maxSize: 0,
          //   imageWidth: 150,
          //   imageHeight: 150,
          //   acceptedTypes: "image/*",
          // },
        ],
      },
    ],
    showProgressBar: "bottom",
    goNextPageAutomatic: false,
  };
  const onComplete = (survey, options) => {
    // Submit the survey data to the backend
    const surveyData = {
      room_type: survey.data["room_type"],
      address: survey.data["address"],
      total_beds: parseInt(survey.data["total_beds"]),
      total_bedrooms: parseInt(survey.data["total_bedrooms"]),
      total_bathrooms: parseInt(survey.data["total_bathrooms"]),
      has_tv: survey.data["has_tv"] === "yes",
      has_kitchen: survey.data["has_kitchen"] === "yes",
      has_air_conditioner: survey.data["has_air_conditioner"] === "yes",
      has_internet: survey.data["has_internet"] === "yes",
      has_study_room: survey.data["has_study_room"] === "yes",
      has_meals: survey.data["has_meals"] === "yes",
      price_per_day: parseFloat(survey.data["price_per_day"]),
      image_url_1: survey.data["image_url_1"][0].content,
      image_url_2: survey.data["image_url_2"][0].content,
      image_url_3: survey.data["image_url_3"][0].content,
      image_url_4: survey.data["image_url_4"][0].content,
      image_url_5: survey.data["image_url_5"][0].content,
      // image_url_1: survey.data["image_url_1"][0].content,

      // additional_images: survey.data["image_url"][0].content, // We'll populate this with additional image URLs
    };
    console.log(surveyData.image_url_1);
    console.log(surveyData.image_url_2);
    console.log(surveyData.image_url_3);
    console.log(surveyData.image_url_4);
    console.log(surveyData.image_url_5);
    // You can handle the image data here based on your requirements.
    // For example, you can convert the image data to a base64 string and send it to the server.
    // For simplicity, we are not handling the image data in this example.
    fetch("http://localhost:3000/hostels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(surveyData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Survey data submitted successfully:", data);
        console.log(surveyData.image_url_1);
        console.log(surveyData.image_url_2);
        console.log(surveyData.image_url_3);
        console.log(surveyData.image_url_4);
        console.log(surveyData.image_url_5);
        // Do something after successful submission if needed
      })
      .catch((error) => {
        console.error("Error submitting survey data:", error);
      });
  };
  return (
    <>
      <HostelOwner_Navbar />
      <div className="survey-page">
        <Survey json={json} onComplete={onComplete} />
      </div>
    </>
  );
}
export default SurveyStep1;

// import React from "react";
// import HostelOwner_Navbar from "./HostelOwner_Navbar";
// import { Survey } from "survey-react";
// import "survey-core/defaultV2.min.css";

// const roomTypeOptions = [
//   {
//     value: "private",
//     text: "Private",
//   },
//   {
//     value: "single",
//     text: "Single",
//   },
//   {
//     value: "double",
//     text: "Double",
//   },
//   {
//     value: "two-sharing",
//     text: "Two-Sharing",
//   },
//   {
//     value: "four-sharing",
//     text: "Four-Sharing",
//   },
// ];

// const booleanOptions = [
//   {
//     name: "has_tv",
//     text: "TV",
//   },
//   {
//     name: "has_kitchen",
//     text: "Kitchen",
//   },
//   {
//     name: "has_air_conditioner",
//     text: "Air Conditioner",
//   },
//   {
//     name: "has_internet",
//     text: "Internet",
//   },
//   {
//     name: "has_study_room",
//     text: "Study Room",
//   },
//   {
//     name: "has_meals",
//     text: "Meals",
//   },
// ];

// function SurveyStep1() {
//   const json = {
//     title: "Hostel Hosting Survey",
//     pages: [
//       {
//         name: "page1",
//         elements: [
//           {
//             type: "radiogroup",
//             name: "room_type",
//             title: "Tell us about your place",
//             isRequired: true,
//             choices: roomTypeOptions,
//           },
//           {
//             type: "text",
//             name: "address",
//             title: "Tell us your location",
//             isRequired: true,
//           },
//           {
//             type: "text",
//             name: "total_beds",
//             title: "Total Beds",
//             isRequired: true,
//             inputType: "number",
//             validators: [{ type: "numeric", minValue: 0 }],
//           },
//           {
//             type: "text",
//             name: "total_bedrooms",
//             title: "Total Bedrooms",
//             isRequired: true,
//             inputType: "number",
//             validators: [{ type: "numeric", minValue: 0 }],
//           },
//           {
//             type: "text",
//             name: "total_bathrooms",
//             title: "Total Bathrooms",
//             isRequired: true,
//             inputType: "number",
//             validators: [{ type: "numeric", minValue: 0 }],
//           },
//         ],
//       },
//       {
//         name: "page2",
//         elements: booleanOptions.map((option) => ({
//           type: "radiogroup",
//           name: option.name,
//           title: `Does your place have ${option.text}?`,
//           isRequired: true,
//           choices: [
//             { value: "yes", text: "Yes" },
//             { value: "no", text: "No" },
//           ],
//         })),
//       },
//       {
//         name: "page3",
//         elements: [
//           {
//             type: "text",
//             name: "price_per_day",
//             title: "Price Per Day",
//             isRequired: true,
//             inputType: "number",
//             validators: [{ type: "numeric", minValue: 0 }],
//           },
//           {
//             type: "file",
//             name: "image_url",
//             title: "Upload an Image",
//             isRequired: true,
//             maxSize: 0, // Set the maximum file size (0 for no limit)
//             imageWidth: 150, // Set the width of the image preview
//             imageHeight: 150, // Set the height of the image preview
//             acceptedTypes: "image/*", // Set the accepted file types (e.g., "image/*" for images)
//           },
//           {
//             type: "file",
//             name: "additional_image_1",
//             title: "Upload Additional Image 1",
//             isRequired: false,
//             maxSize: 0,
//             imageWidth: 150,
//             imageHeight: 150,
//             acceptedTypes: "image/*",
//           },
//           {
//             type: "file",
//             name: "additional_image_2",
//             title: "Upload Additional Image 2",
//             isRequired: false,
//             maxSize: 0,
//             imageWidth: 150,
//             imageHeight: 150,
//             acceptedTypes: "image/*",
//           },
//           {
//             type: "file",
//             name: "additional_image_3",
//             title: "Upload Additional Image 3",
//             isRequired: false,
//             maxSize: 0,
//             imageWidth: 150,
//             imageHeight: 150,
//             acceptedTypes: "image/*",
//           },
//           {
//             type: "file",
//             name: "additional_image_4",
//             title: "Upload Additional Image 4",
//             isRequired: false,
//             maxSize: 0,
//             imageWidth: 150,
//             imageHeight: 150,
//             acceptedTypes: "image/*",
//           },
//           {
//             type: "file",
//             name: "additional_image_5",
//             title: "Upload Additional Image 5",
//             isRequired: false,
//             maxSize: 0,
//             imageWidth: 150,
//             imageHeight: 150,
//             acceptedTypes: "image/*",
//           },
//         ],
//       },
//     ],
//     showProgressBar: "bottom",
//     goNextPageAutomatic: true,
//   };

//   const onComplete = (survey, options) => {
//     const surveyData = {
//       room_type: survey.data["room_type"],
//       address: survey.data["address"],
//       total_beds: parseInt(survey.data["total_beds"]),
//       total_bedrooms: parseInt(survey.data["total_bedrooms"]),
//       total_bathrooms: parseInt(survey.data["total_bathrooms"]),
//       has_tv: survey.data["has_tv"] === "yes",
//       has_kitchen: survey.data["has_kitchen"] === "yes",
//       has_air_conditioner: survey.data["has_air_conditioner"] === "yes",
//       has_internet: survey.data["has_internet"] === "yes",
//       has_study_room: survey.data["has_study_room"] === "yes",
//       has_meals: survey.data["has_meals"] === "yes",
//       price_per_day: parseFloat(survey.data["price_per_day"]),
//       image_url: "", // We'll update this with the base64 string of the main image
//       additional_images: [], // We'll populate this with the base64 strings of additional images
//     };

//     // Handle the main image
//     if (survey.data["image_url"].length > 0) {
//       const mainImageFile = survey.data["image_url"][0];
//       const reader = new FileReader();
//       reader.onload = () => {
//         surveyData.image_url = reader.result.split(",")[1]; // Get the base64 string
//         submitSurveyData(surveyData);
//       };
//       reader.readAsDataURL(mainImageFile);
//     } else {
//       submitSurveyData(surveyData);
//     }

//     // Handle additional images
//     for (let i = 1; i <= 5; i++) {
//       const key = `additional_image_${i}`;
//       if (survey.data[key] && survey.data[key].length > 0) {
//         const additionalImageFile = survey.data[key][0];
//         const reader = new FileReader();
//         reader.onload = () => {
//           surveyData.additional_images.push(reader.result.split(",")[1]); // Get the base64 string
//           if (surveyData.additional_images.length === 5) {
//             submitSurveyData(surveyData);
//           }
//         };
//         reader.readAsDataURL(additionalImageFile);
//       }
//     }
//   };

//   const submitSurveyData = (surveyData) => {
//     // Submit the survey data to the backend
//     fetch("http://localhost:3000/hostels", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(surveyData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Survey data submitted successfully:", data);
//         // Do something after successful submission if needed
//       })
//       .catch((error) => {
//         console.error("Error submitting survey data:", error);
//         // Handle errors if needed
//       });
//   };

//   return (
//     <>
//       <HostelOwner_Navbar />
//       <div className="survey-page">
//         <Survey json={json} onComplete={onComplete} />
//       </div>
//     </>
//   );
// }

// export default SurveyStep1;
