import TeamItem from 'src/components/team/TeamItem';
import React from 'react';
import { Team } from 'src/models/team.model';
import ItemList from 'src/components/itemList';
import { observer } from 'mobx-react';

interface TeamListProps {
  teams: Team[];
  isTeamPage?: boolean;
}

const TeamList: React.FC<TeamListProps> = ({ teams, isTeamPage = false }) => (
  <ItemList<Team>
    items={teams}
    ItemComponent={TeamItem}
    itemComponentProps={{ isTeamPage }}
  />
);

export default observer(TeamList);
