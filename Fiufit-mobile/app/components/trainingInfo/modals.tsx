import { useState } from "react";

const useTitleModal = () => {
  const [isTitleOpen, setIsTitleOpen] = useState(false);
  const closeTitle = () => setIsTitleOpen(false);
  const openTitle = () => setIsTitleOpen(true);
  return { isTitleOpen, openTitle, closeTitle};
};
  
const useDescriptionModal = () => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const closeDescription = () => setIsDescriptionOpen(false);
  const openDescription = () => setIsDescriptionOpen(true);
  return { isDescriptionOpen, openDescription, closeDescription};
};
  
const useTypeModal = () => {
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const closeType = () => setIsTypeOpen(false);
  const openType = () => setIsTypeOpen(true);
  return { isTypeOpen, openType, closeType};
};

const useDifficultyModal = () => {
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(false);
  const closeDifficulty = () => setIsDifficultyOpen(false);
  const openDifficulty = () => setIsDifficultyOpen(true);
  return { isDifficultyOpen, openDifficulty, closeDifficulty};
};

export { useTitleModal, useDescriptionModal, useTypeModal, useDifficultyModal };
