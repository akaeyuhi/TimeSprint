import React from 'react';
import { TeamDto } from 'src/services/dto/team.dto';
import { useValidation, ValidationErrors } from 'src/hooks/use-validation';
import { Team } from 'src/models/team.model';
import ItemForm from 'src/components/itemForm';

interface TeamFormProps {
  team: Team | null;
  onSubmit: (teamDto: TeamDto) => Promise<void>;
  onCancel: () => void;
  isEdited?: boolean;
}

const validate = (state: TeamDto): ValidationErrors<TeamDto> => ({
  name: !(state.name.length > 8),
  description: !(state.description.length > 20),
});

const CreateTeamForm: React.FC<TeamFormProps> = ({
  team,
  onSubmit,
  onCancel,
  isEdited = false,
}) => {
  const [formData, setFormData, validation] = useValidation<TeamDto>(
    {
      name: '',
      description: '',
    },
    validate
  );

  return (
    <ItemForm<TeamDto, Team>
      formData={formData}
      item={team}
      onCancel={onCancel}
      onSubmit={onSubmit}
      setFormData={setFormData}
      validation={validation}
      isEdited={isEdited}
    />
  );
};

export default CreateTeamForm;
