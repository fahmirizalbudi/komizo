type FormLabelProps = {
  text: string
  bind?: string
}

const FormLabel = ({ text, bind }: FormLabelProps) => {
  return (
    <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider" htmlFor={bind}>
      {text}
    </label>
  )
}

export default FormLabel
