import { ChevronRight } from 'lucide-react';
import Button from '../ui/Button';
import styled from 'styled-components';

const Span = styled.span`
  width: 100%;
  height: 100%;
  text-align: center;
  --tw-bg-opacity: 1;
  background-color: rgb(23 23 23 / var(--tw-bg-opacity));
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  padding-left: 1rem;
  padding-right: 1rem;

  @media (min-width: 1024px) {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
`;

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center border-neutral-800 w-[90vw]">
      <h1 className="text-center text-4xl tracking-wide sm:text-5xl lg:text-7xl">
        Protect Your Crops with AI-Powered
        <span className="bg-gradient-to-r from-green-900 to-green-600 bg-clip-text text-transparent">
          {' '}
          Disease Detection
        </span>
      </h1>
      <p className="mt-10 max-w-4xl text-center text-base text-neutral-500">
        Early detection, early action. Save your yields.
      </p>
      <div className="my-[5rem] flex justify-center gap-1">
        <Button type="rounded" to="/upload">
          Try it Now
          <ChevronRight />
        </Button>
        <Button type="secondary">
          <Span>Learn More</Span>
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
