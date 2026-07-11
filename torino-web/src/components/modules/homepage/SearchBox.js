"use client";

import { useEffect, useRef, useState } from "react";
import { DatePicker } from "zaman";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { originLocations, destinationLocations } from "@/constants/Locations";

import styles from "@/styles/homepage/SearchBox.module.css";
import LocationIcon from "../../../../public/icons/LocationIcon";
import GlobalSearchIcon from "../../../../public/icons/GlobalSearchIcon";
import CalenderIcon from "../../../../public/icons/CalendarIcon";

function SearchBox({ searchParams }) {
  const router = useRouter();

  const [openBox, setOpenBox] = useState(null);
  const [originText, setOriginText] = useState("");
  const [destinationText, setDestinationText] = useState("");

  const originWrapperRef = useRef(null);
  const destinationWrapperRef = useRef(null);

  const { setValue, handleSubmit, watch, control } = useForm({
    defaultValues: {
      originId: "",
      destinationId: "",
      date: {
        startDate: null,
        endDate: null,
      },
    },
  });

  //closing dropdown action
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openBox === "origin" &&
        originWrapperRef.current &&
        !originWrapperRef.current.contains(event.target)
      ) {
        setOpenBox(null);
      }

      if (
        openBox === "destination" &&
        destinationWrapperRef.current &&
        !destinationWrapperRef.current.contains(event.target)
      ) {
        setOpenBox(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openBox]);

  //setting values from url
  useEffect(() => {
    const originIdFromUrl = searchParams?.originId || "";
    const destinationIdFromUrl = searchParams?.destinationId || "";
    const startDateFromUrl = searchParams?.startDate;
    const endDateFromUrl = searchParams?.endDate;

    if (originIdFromUrl) {
      const origin = originLocations.find(
        (item) => String(item.id) === String(originIdFromUrl),
      );
      if (origin) {
        setValue("originId", origin.id);
        setOriginText(origin.persianName);
      }
    }

    if (destinationIdFromUrl) {
      const destination = destinationLocations.find(
        (item) => String(item.id) === String(destinationIdFromUrl),
      );
      if (destination) {
        setValue("destinationId", destination.id);
        setDestinationText(destination.persianName);
      }
    }

    if (startDateFromUrl || endDateFromUrl) {
      setValue("date", {
        startDate: startDateFromUrl ? new Date(startDateFromUrl) : null,
        endDate: endDateFromUrl ? new Date(endDateFromUrl) : null,
      });
    }
  }, [searchParams, setValue]);

  const filteredOriginLocations = originLocations.filter((location) =>
    location.persianName.includes(originText),
  );

  const filteredDestinationLocations = destinationLocations.filter((location) =>
    location.persianName.includes(destinationText),
  );

  const originId = watch("originId");
  const destinationId = watch("destinationId");

  const handleSelectLocation = (type, location) => {
    if (type === "origin") {
      setValue("originId", location.id);
      setOriginText(location.persianName);
    } else {
      setValue("destinationId", location.id);
      setDestinationText(location.persianName);
    }
    setOpenBox(null);
  };

  const submitHandler = async (data) => {
    const query = new URLSearchParams();

    if (data.originId) query.set("originId", data.originId);

    if (data.destinationId) query.set("destinationId", data.destinationId);

    if (data.date?.startDate) {
      query.set("startDate", data.date.startDate.toISOString());
    }

    if (data.date?.endDate) {
      query.set("endDate", data.date.endDate.toISOString());
    }

    const queryString = query.toString();
    router.push(queryString ? `/?${queryString}` : "/");
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(submitHandler)}>
      {/* choose origin */}
      <div className={styles.inputs}>
        <div className={styles.inputWrapper} ref={originWrapperRef}>
          <LocationIcon />
          <Controller
            name="originId"
            control={control}
            render={() => (
              <input
                placeholder="مبدا"
                value={originText}
                onFocus={() => setOpenBox("origin")}
                onChange={(e) => {
                  setOriginText(e.target.value);
                  setValue("originId", "");
                  setOpenBox("origin");
                }}
              />
            )}
          />
          {/* most view locations */}
          {openBox === "origin" && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader}>پرتردد</div>
              {filteredOriginLocations.map((location) => (
                <div
                  key={location.id}
                  className={styles.dropdownItem}
                  onMouseDown={() => handleSelectLocation("origin", location)}
                >
                  <LocationIcon />
                  <span>{location.persianName}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* choose destination */}
        <div className={styles.inputWrapper} ref={destinationWrapperRef}>
          <GlobalSearchIcon />
          <Controller
            name="destinationId"
            control={control}
            render={() => (
              <input
                placeholder="مقصد"
                value={destinationText}
                onFocus={() => setOpenBox("destination")}
                onChange={(e) => {
                  setDestinationText(e.target.value);
                  setValue("destinationId", "");
                  setOpenBox("destination");
                }}
              />
            )}
          />

          {/* most view locations */}
          {openBox === "destination" && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader}>پرتردد</div>
              {filteredDestinationLocations.map((location) => (
                <div
                  key={location.id}
                  className={styles.dropdownItem}
                  onMouseDown={() =>
                    handleSelectLocation("destination", location)
                  }
                >
                  <LocationIcon />
                  <span>{location.persianName}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* choose date */}
      <div className={styles.left}>
        <div className={styles.datepickerWrapper}>
          <CalenderIcon />
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, value } }) => {
              const from = value?.startDate
                ? new Date(value.startDate)
                : undefined;
              const to = value?.endDate ? new Date(value.endDate) : undefined;
              const datePickerKey = `${from?.toISOString() || "empty"}-${to?.toISOString() || "empty"}`;

              return (
                <DatePicker
                  key={datePickerKey}
                  range
                  from={from}
                  to={to}
                  onChange={(e) =>
                    onChange({
                      startDate: e?.from ? new Date(e.from) : null,
                      endDate: e?.to ? new Date(e.to) : null,
                    })
                  }
                  inputAttributes={{
                    placeholder: "تاریخ",
                  }}
                  accentColor="#28a745"
                  customShowDateFormat="DD MMMM"
                  round="x2"
                  inputClass={styles.datepickerInput}
                />
              );
            }}
          />
        </div>

        <button type="submit">جستجو</button>
      </div>
    </form>
  );
}

export default SearchBox;
