import { LucideIcon } from 'lucide-react';
import React from 'react'

type Props = {
  name: string;
  icon: LucideIcon;
}

const SkillCard = ({icon:Icon, name}:Props) => {
  return (
    <div className="group relative bg-surface-card dark:bg-navy-elevated border border-hairline dark:border-white/10 rounded-lg p-4 flex flex-col items-center gap-3">
      <div className="w-12 h-12 rounded-md bg-canvas dark:bg-navy border border-hairline dark:border-white/10 flex items-center justify-center">

      <Icon className="w-6 h-6 text-ink dark:text-on-dark"/>

       </div>

       <span className="text-sm font-medium text-ink dark:text-on-dark">{name}</span>

    </div>
  );
};

export default SkillCard;
