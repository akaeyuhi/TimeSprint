import React from 'react';
import { Project } from 'src/models/project.model';
import ProjectItem from 'src/components/project/ProjectItem';
import ItemList from 'src/components/itemList';
import { observer } from 'mobx-react';

interface ProjectListProps {
  projects: Project[];
  onDelete: (project: Project) => void;
  isAdmin?: boolean;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onDelete,
  isAdmin = false,
}) => (
  <ItemList<Project>
    items={projects}
    ItemComponent={ProjectItem}
    itemComponentProps={{ onDelete, isAdmin }}
  />
);

export default observer(ProjectList);
