import { useState } from "react";
import ButtonComponent from "../common/button/button";
import InputComponent from "../common/input/input";
import { addNewJob } from "../../api/jobs";
import { IEmployer, IJob } from "../../types";

interface NewJobFromProps {
  onJobPosted: () => void;
  company: IEmployer;
}

const PostNewJobComponent = (props: NewJobFromProps) => {
  const [formData, setFormData] = useState({
    title: {
      value: '',
      error: ''
    },
    description: {
      value: '',
      error: ''
    },
    skills: {
      value: '',
      error: ''
    },
    budget: {
      value: '',
      error: ''
    },
    duration: {
      value: '',
      error: ''
    },
    requirements: {
      value: '',
      error: ''
    }
  });

  const setValue = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: {
        value,
        error: ''
      }
    });
  }

  const createJob = async () => {
    let isValid = true;
    const newFormData = { ...formData };

    if (formData.title.value === '') {
      newFormData.title.error = 'Title is required';
      isValid = false;
    }

    if (formData.description.value === '') {
      newFormData.description.error = 'Description is required';
      isValid = false;
    }

    if (formData.skills.value.length === 0) {
      newFormData.skills.error = 'Skills are required';
      isValid = false;
    }

    if (formData.budget.value === '') {
      newFormData.budget.error = 'Budget is required';
      isValid = false;
    }

    if (formData.duration.value === '') {
      newFormData.duration.error = 'Duration is required';
      isValid = false;
    }

    if (formData.requirements.value === '') {
      newFormData.requirements.error = 'Requirements are required';
      isValid = false;
    }

    if (!isValid) {
      setFormData(newFormData);
    }

    if (!isValid) {
      return;
    }

    const job = {
      title: formData.title.value,
      tags: formData.skills.value.split(',').map((skill: string) => skill.trim()),
      postedDate: new Date().toDateString(),
      deadline: new Date(new Date().valueOf() + 30 * 24 * 60 * 60 * 1000).toDateString(),
      applicants: Math.floor(Math.random() * 10),
      description: formData.description.value,
      requirements: formData.requirements.value,
      companyId: props.company.id,
      companyName: props.company.companyName,
    } as IJob

    await addNewJob(job);
    props.onJobPosted();
    
  }

  return <div className="p-10">
    <h1>Post New Job</h1>
    <InputComponent
      label="Job Title"
      placeholder="Enter job title"
      value={formData.title.value}
      variant={formData.title.error ? 'danger' : 'default'}
      message={formData.title.error}
      onChange={(event) => setValue('title', event.target.value)}
      required
    />
    <InputComponent
      label="Description"
      placeholder="Enter job description"
      isTextArea
      value={formData.description.value}
      variant={formData.description.error ? 'danger' : 'default'}
      message={formData.description.error}
      onChange={(event) => setValue('description', event.target.value)}
      required
    />

    <InputComponent
      label="Skills"
      value={formData.skills.value}
      variant={formData.skills.error ? 'danger' : 'default'}
      message={formData.skills.error}
      onChange={(event) => setValue('skills', event.target.value)}
      placeholder="Enter comma separated skills (e.g. JAVA, Python)"
      required
    />

    <InputComponent
      label="Budget"
      placeholder="Enter budget"
      value={formData.budget.value}
      variant={formData.budget.error ? 'danger' : 'default'}
      message={formData.budget.error}
      onChange={(event) => setValue('budget', event.target.value)}
      required
    />

    <InputComponent
      label="Duration"
      placeholder="Enter duration"
      value={formData.duration.value}
      variant={formData.duration.error ? 'danger' : 'default'}
      message={formData.duration.error}
      onChange={(event) => setValue('duration', event.target.value)}
      required
    />

    <InputComponent
      label="Requirements"
      placeholder="Enter requirements"
      isTextArea
      value={formData.requirements.value}
      variant={formData.requirements.error ? 'danger' : 'default'}
      message={formData.requirements.error}
      onChange={(event) => setValue('requirements', event.target.value)}
      required
    />

    <div className="flex justify-end">
      <ButtonComponent onClick={createJob} >
        Post Job
      </ButtonComponent>
    </div>

  </div>
}

export default PostNewJobComponent;