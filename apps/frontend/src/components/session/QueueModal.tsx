import React from 'react'

type Props = {
  setOpen: (open: boolean) => void;
    open: boolean;
  onQueue: () => void;
};

export default function QueueModal({
  setOpen,
  open,
  onQueue,
 }: Props) {
    
  return (
    <div>QueueModal</div>
  )
}