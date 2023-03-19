import React from 'react'

function TeamCard({team}) {
  return (
    <div className='bg-slate-400 text-black text-sm md:text-base min-w-[300px] max-w-[1000px] flex flex-col gap-1 justify-center items-start p-2 rounded-lg'>
        <div>
            <h1>Team Name: {team.name}</h1>
            <h2>Member Count: {team.memberCount}</h2>
        </div>
        <div>
            <h1 className='font-semibold'>Members: </h1>
            {team.members.map(member => {
                return <div className='flex gap-1 flex-wrap'>
                    <h2 className='font-semibold'>{member.name}:</h2>
                    <h2>{member.email}</h2>
                    <h2>{member.phone}</h2>
                </div>
            })}
        </div>
        
    </div>
  )
}

export default TeamCard