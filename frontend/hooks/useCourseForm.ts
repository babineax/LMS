import { useState } from "react";
import { Alert } from "react-native";
import { CourseFormData } from "../types/types";
import { uploadFile, supabase } from "@/utils/fileUpload";
import { useAuth } from "@/contexts/AuthContext";  

//  hook to manage course form state and actions
export const useCourseForm = () => {
  // Initializing form state with its default values
  const {profile} = useAuth();
  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    description: "",
    shortDescription: "",
    category: "",
    level: "beginner",
    language: "english",
    price: "",
    duration: "",
    maxStudents: "150",
    startDate: "",
    tags: [],
    prerequisites: "",
    learningOutcomes: [""],
    image_url: '',
    isPublic: true,
    allowDiscussions: true,
    certificateEnabled: true,
  });

  // Track form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generic function to update form fields
  const handleInputChange = <K extends keyof CourseFormData>(
    field: K,
    value: CourseFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Add a new tag to the tags array if it doesn't already exist
  const addTag = (tag: string) => {
    if (!formData.tags.includes(tag)) {
      handleInputChange("tags", [...formData.tags, tag]);
    }
  };

  // Remove a specific tag from the tags array
  const removeTag = (tagToRemove: string) => {
    handleInputChange(
      "tags",
      formData.tags.filter((tag) => tag !== tagToRemove)
    );
  };

  // Add a new empty learning outcome to the array
  const addLearningOutcome = () => {
    handleInputChange("learningOutcomes", [...formData.learningOutcomes, ""]);
  };

  // Update a specific learning outcome at the given index
  const updateLearningOutcome = (index: number, value: string) => {
    const updated = formData.learningOutcomes.map((item, i) =>
      i === index ? value : item
    );
    handleInputChange("learningOutcomes", updated);
  };

  // Remove a learning outcome at the given index, ensuring at least one remains
  const removeLearningOutcome = (index: number) => {
    if (formData.learningOutcomes.length > 1) {
      const updated = formData.learningOutcomes.filter((_, i) => i !== index);
      handleInputChange("learningOutcomes", updated);
    }
  };

  // Validate required form fields
  const validateForm = () => {
    const { title, description, category, price } = formData;
    if (!title || !description || !category || !price) {
      Alert.alert("Error", "Please fill in all required fields");
      return false;
    }
    return true;
  };

  // Handle form submission with a simulated async delay
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      let uploadedUrl: string | null = null;

    if (formData.image_url) {
      // uploadFile returns { id, path, fullPath }
      uploadedUrl = await uploadFile(
        formData.image_url,
        `course-${Date.now()}.jpg`
      );
      
    }

    const payload = { ...formData, image_url: uploadedUrl };
    if (profile?.role === "teacher") {
      const { data, error } = await supabase
        .from("courses")
        .insert({
          title: payload.title,
          description: payload.description,
          teacher_id: profile?.id,
          institution_id: profile?.institution_id,
          duration: payload.duration,
          max_capacity: payload.maxStudents,
          fee_amount: payload.price,
          category: payload.category,
          image_url: uploadedUrl,
        })
        .select(); 
      
      if (error) {
        console.error("Error inserting course:", error);
        return;
      }
      console.log("Course inserted:", data);
    }
      
      console.log("Course submitted:", payload);
      Alert.alert("Success", "Course created successfully!");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to upload course image");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Save the current form state as a draft
  const saveDraft = () => {
    Alert.alert("Draft", "Course saved as draft");
  };

  //  all form state and handler functions Returned
  return {
    formData,
    isSubmitting,
    handleInputChange,
    addTag,
    removeTag,
    addLearningOutcome,
    updateLearningOutcome,
    removeLearningOutcome,
    handleSubmit,
    saveDraft,
  };
};
