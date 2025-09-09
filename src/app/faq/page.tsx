"use client";
import { Accordion, AccordionItem } from "@heroui/react";

export default function Faq() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <Accordion selectionMode="multiple">
      <AccordionItem key="1" aria-label="Accordion 1" title="Student">
        {defaultContent}
      </AccordionItem>
      <AccordionItem key="2" aria-label="Accordion 2" title="Teacher">
        {defaultContent}
      </AccordionItem>
      <AccordionItem key="3" aria-label="Accordion 3" title="Admin">
        {defaultContent}
      </AccordionItem>
    </Accordion>
  );
}
