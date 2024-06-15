import React from 'react';
import { Project } from 'src/models/project.model';
import { useValidation, ValidationErrors } from 'src/hooks/use-validation';
import DeadlineForm from 'src/components/deadlineForm';
import { ProjectDto } from 'src/services/dto/project.dto';

interface ProjectFormProps {
  project: Project | null;
  onSubmit: (newProject: ProjectDto, id?: string) => void;
  onCancel: () => void;
  isEdited?: boolean;
}

const validate = (state: ProjectDto): ValidationErrors<ProjectDto> => ({
  name: !(state.name && state.name.length > 8 && state.name.length < 20),
  description: !(state.description && state.description.length > 20),
  startDate: !(
    state.endDate &&
    state.startDate &&
    state.startDate < state.endDate
  ),
  endDate: !(
    state.endDate &&
    state.startDate &&
    state.startDate < state.endDate
  ),
});

const EditProjectForm: React.FC<ProjectFormProps> = ({
  project,
  onSubmit,
  onCancel,
  isEdited = false,
}) => {
  const [formData, setFormData, validation] = useValidation<ProjectDto>(
    {
      name: project?.name ?? '',
      description: project?.description ?? '',
      startDate: project?.startDate ?? new Date(),
      endDate: project?.endDate ?? new Date(Date.now() + 1),
    },
    validate
  );

  return (
    <DeadlineForm<ProjectDto, Project>
      formData={formData}
      item={project}
      onCancel={onCancel}
      onSubmit={onSubmit}
      setFormData={setFormData}
      validation={validation}
      isEdited={isEdited}
    />
  );
};

export default EditProjectForm;
