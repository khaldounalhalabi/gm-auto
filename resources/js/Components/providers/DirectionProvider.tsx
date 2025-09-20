import { DirectionProvider as RadixDirProvider } from "@radix-ui/react-direction";
import { ReactNode } from "react";

const DirectionProvider = ({
    children,
    direction,
}: {
    children?: ReactNode;
    direction: "ltr" | "rtl";
}) => <RadixDirProvider dir={direction}>{children}</RadixDirProvider>;

export default DirectionProvider;
