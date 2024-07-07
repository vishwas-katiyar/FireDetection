import React from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Chip,
  Typography,
} from "@material-tailwind/react";

const PopoverWithDescription = ({
  buttonLabel,
  title,
  description,
  chipLabel,
  items,
}) => {
  const [openPopover, setOpenPopover] = React.useState(false);

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  return (
    <Popover open={openPopover} handler={setOpenPopover}>
      <PopoverHandler {...triggers}>{buttonLabel}</PopoverHandler>
      <PopoverContent {...triggers} className="z-50 max-w-[26rem]">
        <div className="mb-2 flex items-center gap-3">
          <Typography
            as="a"
            href="#"
            variant="h6"
            color="blue-gray"
            className="font-bold transition-colors hover:text-gray-900"
          >
            {title}
          </Typography>
          <Chip
            value={chipLabel}
            className="rounded-full px-2 py-1 font-medium capitalize tracking-wide"
          />
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal text-blue-gray-500"
        >
          {description}
        </Typography>
        <div className="mt-4 flex items-center gap-5">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-1">
              <item.icon className={`-mt-0.5 h-4 w-4 ${item.iconColor}`} />
              <Typography
                color="gray"
                className="text-xs font-medium text-blue-gray-500"
              >
                {item.label}
              </Typography>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverWithDescription;
