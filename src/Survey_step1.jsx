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
            name: "location",
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
            name: "image_url",
            title: "Upload an Image",
            isRequired: true,
            maxSize: 0, // Set the maximum file size (0 for no limit)
            imageWidth: 150, // Set the width of the image preview
            imageHeight: 150, // Set the height of the image preview
            acceptedTypes: "image/*", // Set the accepted file types (e.g., "image/*" for images)
          },
          // {
          //   type: "file",
          //   name: "image_url",
          //   title: "Upload an Image",
          //   isRequired: true,
          //   maxSize: 0, // Set the maximum file size (0 for no limit)
          //   imageWidth: 250, // Set the width of the image preview
          //   imageHeight: 250, // Set the height of the image preview
          //   acceptedTypes: "image/*", // Set the accepted file types (e.g., "image/*" for images)
          // },
        ],
      },
    ],
    showProgressBar: "bottom",
    goNextPageAutomatic: true,
  };
  const onComplete = (survey, options) => {
    // Submit the survey data to the backend
    const surveyData = {
      room_type: survey.data["room_type"],
      location: survey.data["location"],
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
      image_url: survey.data["image_url"][0].content,
    };
    console.log(surveyData.image_url)
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
        console.log(surveyData.image_url)
        console.log("Survey data submitted successfully:", data);
        console.log(surveyData.image_url)
        // Do something after successful submission if needed
      })
      .catch((error) => {
        console.error("Error submitting survey data:", error);
        // Handle errors if needed
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