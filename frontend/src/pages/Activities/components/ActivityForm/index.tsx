import React from 'react';
import { useValidation, ValidationErrors } from 'src/hooks/use-validation';
import { LeisureActivityDto } from 'src/services/dto/activity.dto';
import DeadlineForm from 'src/components/deadlineForm';
import { LeisureActivity } from 'src/models/activity.model';

interface ActivityFormProps {
  onSubmit: (newActivity: LeisureActivityDto, id?: number) => void;
  onCancel: () => void;
  isEdited?: boolean;
  activity: LeisureActivity | null;
}

const validate = (
  state: LeisureActivityDto
): ValidationErrors<LeisureActivityDto> => ({
  name: !(state.name && state.name.length > 8),
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

const ActivityForm: React.FC<ActivityFormProps> = ({
  activity,
  onSubmit,
  onCancel,
  isEdited = false,
}) => {
  const [formData, setFormData, validation] = useValidation<LeisureActivityDto>(
    {
      name: activity?.name ?? '',
      description: activity?.description ?? '',
      startDate: activity?.startDate ?? new Date(),
      endDate: activity?.endDate ?? new Date(Date.now() + 1),
    },
    validate
  );

  return (
    <DeadlineForm<LeisureActivityDto, LeisureActivity>
      formData={formData}
      item={activity}
      onCancel={onCancel}
      onSubmit={onSubmit}
      setFormData={setFormData}
      validation={validation}
      isEdited={isEdited}
    />
  );
};

export default ActivityForm;
