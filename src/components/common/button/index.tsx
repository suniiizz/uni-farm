import { buttonClassName } from "@/components/common/constant/className";

type Props = React.ComponentPropsWithoutRef<"button"> & {
  customType?: string;
};

const Button = ({ customType, ...props }: Props) => {
  const className = `${buttonClassName[customType ?? "DEFAULT"]} ${
    props.className ?? ""
  }`;
  return <button {...props} className={className} />;
};

export default Button;
